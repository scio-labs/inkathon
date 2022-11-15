#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]

extern crate alloc;

#[openbrush::contract]
mod azd_registry {
    use crate::azd_registry::Error::{
        CallerIsNotOwner, NoRecordsForAddress, RecordNotFound, WithdrawFailed,
    };
    use alloc::string::String;
    use alloc::vec::Vec;
    use core::result::*;
    use ink_storage::{traits::SpreadAllocate, Mapping};
    use openbrush::{contracts::psp34::extensions::metadata::*, traits::Storage};

    /// Emitted whenever a new name is being registered.
    #[ink(event)]
    pub struct Register {
        #[ink(topic)]
        name: String,
        #[ink(topic)]
        from: ink_env::AccountId,
    }

    /// Emitted whenever a new name is being registered.
    #[ink(event)]
    pub struct Release {
        #[ink(topic)]
        name: String,
        #[ink(topic)]
        from: ink_env::AccountId,
    }

    /// Emitted whenever an address changes.
    #[ink(event)]
    pub struct SetAddress {
        #[ink(topic)]
        name: String,
        from: ink_env::AccountId,
        #[ink(topic)]
        old_address: Option<ink_env::AccountId>,
        #[ink(topic)]
        new_address: ink_env::AccountId,
    }

    /// Emitted whenever a name is being transferred.
    #[ink(event)]
    pub struct Transfer {
        #[ink(topic)]
        name: String,
        from: ink_env::AccountId,
        #[ink(topic)]
        old_owner: Option<ink_env::AccountId>,
        #[ink(topic)]
        new_owner: ink_env::AccountId,
    }

    /// Domain name service contract inspired by
    /// [this blog post](https://medium.com/@chainx_org/secure-and-decentralized-polkadot-domain-name-system-e06c35c2a48d).
    ///
    /// # Note
    ///
    /// This is a port from the blog post's ink! 1.0 based version of the contract
    /// to ink! 2.0.
    ///
    /// # Description
    ///
    /// The main function of this contract is domain name resolution which
    /// refers to the retrieval of numeric values corresponding to readable
    /// and easily memorable names such as "polka.dot" which can be used
    /// to facilitate transfers, voting and DApp-related operations instead
    /// of resorting to long IP addresses that are hard to remember.
    #[ink(storage)]
    #[derive(Default, SpreadAllocate, Storage)]
    pub struct DomainNameService {
        /// A Stringmap to store all name to addresses mapping.
        name_to_address: Mapping<String, ink_env::AccountId>,
        /// A Stringmap to store all name to owners mapping.
        name_to_owner: Mapping<String, ink_env::AccountId>,
        /// The default address.
        default_address: ink_env::AccountId,
        /// Fee to pay for domain registration
        fee: Balance,
        /// Owner of the contract
        /// can withdraw funds
        owner: ink_env::AccountId,
        /// All names of an address
        owner_to_names: Mapping<ink_env::AccountId, Vec<String>>,
        additional_info: Mapping<String, Vec<(String, String)>>,
        // PSP34 Storage
        #[storage_field]
        psp34: psp34::Data,
        #[storage_field]
        metadata: metadata::Data,
    }

    /// Errors that can occur upon calling this contract.
    #[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std", derive(::scale_info::TypeInfo))]
    pub enum Error {
        PSP34Error(PSP34Error),
        /// Returned if the name already exists upon registration.
        NameAlreadyExists,
        /// Returned if caller is not owner while required to.
        CallerIsNotOwner,
        /// Returned if caller did not send fee
        FeeNotPaid,
        /// Returned if name is empty
        NameEmpty,
        /// Record with the following key doesn't exist
        RecordNotFound,
        /// Address has no records
        NoRecordsForAddress,
        /// Withdraw failed
        WithdrawFailed,
    }

    /// Type alias for the contract's result type.
    // pub type Result<T> = core::result::Result<T, Error>;

    impl PSP34 for DomainNameService {}
    impl PSP34Metadata for DomainNameService {}

    impl DomainNameService {
        /// Creates a new domain name service contract.
        #[ink(constructor)]
        pub fn new(fee: Option<Balance>) -> Self {
            // This call is required in order to correctly initialize the
            // `Mapping`s of our contract.
            ink_lang::utils::initialize_contract(|contract: &mut Self| {
                contract.default_address = Default::default();
                contract.fee = match fee {
                    Some(fee) => fee,
                    None => Default::default(),
                };
                contract.owner = Self::env().caller();
            })
        }

        /// Transfers `value` amount of tokens to the caller.
        ///
        /// # Errors
        ///
        /// - Panics in case the requested transfer exceeds the contract balance.
        /// - Panics in case the requested transfer would have brought this
        ///   contract's balance below the minimum balance (i.e. the chain's
        ///   existential deposit).
        /// - Panics in case the transfer failed for another reason.
        #[ink(message)]
        pub fn withdraw(&mut self, value: Balance) -> Result<(), Error> {
            if self.owner != self.env().caller() {
                return Err(CallerIsNotOwner);
            }

            assert!(value <= self.env().balance(), "insufficient funds!");

            if self.env().transfer(self.env().caller(), value).is_err() {
                return Err(WithdrawFailed);
            }

            Ok(())
        }

        /// Register specific name with caller as owner.
        #[ink(message, payable)]
        pub fn register(&mut self, name: String) -> Result<(), Error> {
            /* Name cannot be empty */
            if name.is_empty() {
                return Err(Error::NameEmpty);
            }

            /* Make sure the registrant is paid for */
            let _transferred = self.env().transferred_value();
            if _transferred < self.fee {
                return Err(Error::FeeNotPaid);
            }

            let caller = self.env().caller();
            if self.name_to_owner.contains(&name) {
                return Err(Error::NameAlreadyExists);
            }

            self.name_to_owner.insert(&name, &caller);
            let previous_names = self.owner_to_names.get(caller);
            if let Some(names) = previous_names {
                let mut new_names = names.clone();
                new_names.push(name.clone());
                self.owner_to_names.insert(caller, &new_names);
            } else {
                self.owner_to_names
                    .insert(caller, &Vec::from([name.clone()]));
            }
            self.env().emit_event(Register {
                name: name.clone(),
                from: caller,
            });

            /* Mint Domain NFT */
            /* TODO Don't make it shit */
            match self._mint_to(caller, Id::Bytes(name.clone().as_bytes().to_vec())) {
                Ok(()) => return Ok(()),
                Err(error) => return Err(Error::PSP34Error(error)),
            }
        }

        /// Release domain from registration.
        #[ink(message)]
        pub fn release(&mut self, name: String) -> Result<(), Error> {
            let caller = self.env().caller();
            let owner = self.get_owner_or_default(&name);
            if caller != owner {
                return Err(CallerIsNotOwner);
            }

            self.name_to_owner.remove(&name);
            self.name_to_address.remove(&name);
            self.remove_name_from_owner(caller, name.clone());
            self.env().emit_event(Release {
                name: name.clone(),
                from: caller,
            });

            /* Burn Domain NFT */
            /* TODO Don't make it shit */
            match self._burn_from(caller, Id::Bytes(name.clone().as_bytes().to_vec())) {
                Ok(()) => return Ok(()),
                Err(error) => return Err(Error::PSP34Error(error)),
            }
        }

        /// Set address for specific name.
        #[ink(message)]
        pub fn set_address(
            &mut self,
            name: String,
            new_address: ink_env::AccountId,
        ) -> Result<(), Error> {
            let caller = self.env().caller();
            let owner = self.get_owner_or_default(&name);
            if caller != owner {
                return Err(Error::CallerIsNotOwner);
            }

            let old_address = self.name_to_address.get(&name);
            self.name_to_address.insert(&name, &new_address);

            self.env().emit_event(SetAddress {
                name,
                from: caller,
                old_address,
                new_address,
            });
            Ok(())
        }

        /// Transfer owner to another address.
        #[ink(message)]
        pub fn transfer(&mut self, name: String, to: ink_env::AccountId) -> Result<(), Error> {
            let caller = self.env().caller();
            let owner = self.get_owner_or_default(&name);
            if caller != owner {
                return Err(CallerIsNotOwner);
            }

            let old_owner = self.name_to_owner.get(&name);
            self.name_to_owner.insert(&name, &to);

            /* Remove from reverse search and add again */
            self.remove_name_from_owner(caller, name.clone());
            let previous_names = self.owner_to_names.get(to);
            if let Some(names) = previous_names {
                let mut new_names = names.clone();
                new_names.push(name.clone());
                self.owner_to_names.insert(to, &new_names);
            } else {
                self.owner_to_names.insert(to, &Vec::from([name.clone()]));
            }

            self.env().emit_event(Transfer {
                name,
                from: caller,
                old_owner,
                new_owner: to,
            });

            Ok(())
        }

        /// Get address for specific name.
        #[ink(message)]
        pub fn get_address(&self, name: String) -> ink_env::AccountId {
            self.get_address_or_default(name)
        }

        /// Get owner of specific name.
        #[ink(message)]
        pub fn get_owner(&self, name: String) -> ink_env::AccountId {
            self.get_owner_or_default(&name)
        }

        /// Returns the owner given the String or the default address.
        fn get_owner_or_default(&self, name: &String) -> ink_env::AccountId {
            self.name_to_owner
                .get(&name)
                .unwrap_or(self.default_address)
        }

        /// Returns the address given the String or the default address.
        fn get_address_or_default(&self, name: String) -> ink_env::AccountId {
            self.name_to_address
                .get(&name)
                .unwrap_or(self.default_address)
        }

        /// Returns all names the address owns
        #[ink(message)]
        pub fn get_names_of_address(&self, owner: ink_env::AccountId) -> Option<Vec<String>> {
            return self.owner_to_names.get(owner);
        }

        /// Deletes a name from owner
        fn remove_name_from_owner(&mut self, owner: ink_env::AccountId, name: String) {
            if let Some(old_names) = self.owner_to_names.get(owner) {
                let mut new_names: Vec<String> = old_names.clone();
                new_names.retain(|prevname| prevname.clone() != name);
                self.owner_to_names.insert(owner, &new_names);
            }
        }

        // /// Sets an arbitrary record
        // #[ink(message)]
        // pub fn set_record(&mut self, owner: ink_env::AccountId, record: (String, String)) {
        //     self.additional_info.insert(owner, )
        //
        //     // /* If info vec already exists, modify it */
        //     // if let Some(original_info) = self.additional_info.get(owner) {
        //     //     /* Filter out the record from the vector, if it is already there */
        //     //     let mut filtered_info: Vec<&(String, String)> = original_info.clone().iter().filter(|&&tuple| {
        //     //         return tuple.0 != record.0.clone();
        //     //     }).collect();
        //     //     filtered_info.push(&record);
        //     //     self.additional_info.insert(owner, &Vec::from(filtered_info));
        //     // } else {
        //     //     self.additional_info.insert(owner, &Vec::from([record]));
        //     // }
        // }

        /// Gets an arbitrary record by key
        #[ink(message)]
        pub fn get_record(&self, name: String, key: String) -> Result<String, Error> {
            return if let Some(info) = self.additional_info.get(name) {
                if let Some(value) = info.iter().find(|tuple| {
                    return tuple.0 == key;
                }) {
                    Ok(value.clone().1)
                } else {
                    Err(RecordNotFound)
                }
            } else {
                Err(NoRecordsForAddress)
            };
        }

        /// Sets all records
        #[ink(message)]
        pub fn set_all_records(
            &mut self,
            name: String,
            records: Vec<(String, String)>,
        ) -> Result<(), Error> {
            let caller = self.env().caller();
            let owner = self.get_owner(name.clone());
            if caller != owner {
                return Err(CallerIsNotOwner);
            }

            self.additional_info.insert(name, &records);

            Ok(())
        }

        /// Gets all records
        #[ink(message)]
        pub fn get_all_records(&self, name: String) -> Result<Vec<(String, String)>, Error> {
            return if let Some(info) = self.additional_info.get(name) {
                return Ok(info);
            } else {
                Err(NoRecordsForAddress)
            };
        }
    }

    #[cfg(test)]
    mod tests {
        use super::*;
        use alloc::string::ToString;
        use ink_env::test::*;
        use ink_env::DefaultEnvironment;
        use ink_lang as ink;

        fn default_accounts() -> DefaultAccounts<ink_env::DefaultEnvironment> {
            ink_env::test::default_accounts::<ink_env::DefaultEnvironment>()
        }

        fn set_next_caller(caller: ink_env::AccountId) {
            ink_env::test::set_caller::<ink_env::DefaultEnvironment>(caller);
        }

        #[ink::test]
        fn register_works() {
            let default_accounts = default_accounts();
            let name = String::from("test");

            set_next_caller(default_accounts.alice);
            let mut contract = DomainNameService::new(None);

            assert_eq!(contract.register(name.clone()), Ok(()));
            assert_eq!(
                contract.get_names_of_address(default_accounts.alice),
                Some(Vec::from([name.clone()]))
            );
            assert_eq!(
                contract.register(name.clone()),
                Err(Error::NameAlreadyExists)
            );
        }

        #[ink::test]
        fn withdraw_works() {
            let default_accounts = default_accounts();
            let name = String::from("test");

            set_next_caller(default_accounts.alice);
            let mut contract = DomainNameService::new(Some(50));

            let acc_balance_before_transfer: Balance =
                ink_env::test::get_account_balance::<DefaultEnvironment>(default_accounts.alice)
                    .unwrap();
            set_value_transferred::<ink_env::DefaultEnvironment>(50 ^ 12);
            assert_eq!(contract.register(name.clone()), Ok(()));
            assert_eq!(contract.withdraw(50 ^ 12), Ok(()));
            let acc_balance_after_withdraw: Balance =
                ink_env::test::get_account_balance::<DefaultEnvironment>(default_accounts.alice)
                    .unwrap();
            assert_eq!(
                acc_balance_before_transfer + 50 ^ 12,
                acc_balance_after_withdraw
            );
        }

        #[ink::test]
        fn withdraw_only_owner() {
            let default_accounts = default_accounts();
            let name = String::from("test");

            set_next_caller(default_accounts.alice);
            let mut contract = DomainNameService::new(Some(50));

            let acc_balance_before_transfer: Balance =
                ink_env::test::get_account_balance::<DefaultEnvironment>(default_accounts.alice)
                    .unwrap();
            set_value_transferred::<ink_env::DefaultEnvironment>(50 ^ 12);
            assert_eq!(contract.register(name.clone()), Ok(()));

            set_next_caller(default_accounts.bob);
            assert_eq!(contract.withdraw(50 ^ 12), Err(CallerIsNotOwner));
        }

        #[ink::test]
        fn reverse_search_works() {
            let default_accounts = default_accounts();
            let name = String::from("test");
            let name2 = String::from("test2");

            set_next_caller(default_accounts.alice);
            let mut contract = DomainNameService::new(None);

            assert_eq!(contract.register(name.clone()), Ok(()));
            assert_eq!(contract.register(name2.clone()), Ok(()));
            assert!(contract
                .get_names_of_address(default_accounts.alice)
                .unwrap()
                .contains(&String::from("test")));
            assert!(contract
                .get_names_of_address(default_accounts.alice)
                .unwrap()
                .contains(&String::from("test2")));
        }

        #[ink::test]
        fn register_empty_reverts() {
            let default_accounts = default_accounts();
            let name = String::from("");

            set_next_caller(default_accounts.alice);
            let mut contract = DomainNameService::new(None);

            assert_eq!(contract.register(name.clone()), Err(Error::NameEmpty));
        }

        #[ink::test]
        fn register_with_fee_works() {
            let default_accounts = default_accounts();
            let name = String::from("test");

            set_next_caller(default_accounts.alice);
            let mut contract = DomainNameService::new(Some(50 ^ 12));

            set_value_transferred::<ink_env::DefaultEnvironment>(50 ^ 12);
            assert_eq!(contract.register(name.clone()), Ok(()));
            assert_eq!(contract.register(name), Err(Error::NameAlreadyExists));
        }

        #[ink::test]
        fn register_without_fee_reverts() {
            let default_accounts = default_accounts();
            let name = String::from("test");

            set_next_caller(default_accounts.alice);
            let mut contract = DomainNameService::new(Some(50 ^ 12));

            assert_eq!(contract.register(name), Err(Error::FeeNotPaid));
        }

        #[ink::test]
        fn release_works() {
            let default_accounts = default_accounts();
            let name = String::from("test");

            set_next_caller(default_accounts.alice);
            let mut contract = DomainNameService::new(None);

            assert_eq!(contract.register(name.clone()), Ok(()));
            assert_eq!(
                contract.set_address(name.clone(), default_accounts.alice),
                Ok(())
            );
            assert_eq!(contract.get_owner(name.clone()), default_accounts.alice);
            assert_eq!(contract.get_address(name.clone()), default_accounts.alice);
            assert_eq!(
                contract.get_names_of_address(default_accounts.alice),
                Some(Vec::from([name.clone()]))
            );

            assert_eq!(contract.release(name.clone()), Ok(()));
            assert_eq!(contract.get_owner(name.clone()), Default::default());
            assert_eq!(contract.get_address(name.clone()), Default::default());
            assert_eq!(
                contract.get_names_of_address(default_accounts.alice),
                Some(Vec::from([]))
            );

            /* Another account can register again*/
            set_next_caller(default_accounts.bob);
            assert_eq!(contract.register(name.clone()), Ok(()));
            assert_eq!(
                contract.set_address(name.clone(), default_accounts.bob),
                Ok(())
            );
            assert_eq!(contract.get_owner(name.clone()), default_accounts.bob);
            assert_eq!(contract.get_address(name.clone()), default_accounts.bob);
            assert_eq!(contract.release(name.clone()), Ok(()));
            assert_eq!(contract.get_owner(name.clone()), Default::default());
            assert_eq!(contract.get_address(name.clone()), Default::default());
        }

        #[ink::test]
        fn set_address_works() {
            let accounts = default_accounts();
            let name = String::from("test");

            set_next_caller(accounts.alice);

            let mut contract = DomainNameService::new(None);
            assert_eq!(contract.register(name.clone()), Ok(()));

            // Caller is not owner, `set_address` should fail.
            set_next_caller(accounts.bob);
            assert_eq!(
                contract.set_address(name.clone(), accounts.bob),
                Err(Error::CallerIsNotOwner)
            );

            // Caller is owner, set_address will be successful
            set_next_caller(accounts.alice);
            assert_eq!(contract.set_address(name.clone(), accounts.bob), Ok(()));
            assert_eq!(contract.get_address(name.clone()), accounts.bob);
        }

        #[ink::test]
        fn transfer_works() {
            let accounts = default_accounts();
            let name = String::from("test");

            set_next_caller(accounts.alice);

            let mut contract = DomainNameService::new(None);
            assert_eq!(contract.register(name.clone()), Ok(()));

            // Test transfer of owner.
            assert_eq!(contract.transfer(name.clone(), accounts.bob), Ok(()));

            assert_eq!(
                contract.get_names_of_address(accounts.alice),
                Some(Vec::from([]))
            );
            assert_eq!(
                contract.get_names_of_address(accounts.bob),
                Some(Vec::from([name.clone()]))
            );

            // Owner is bob, alice `set_address` should fail.
            assert_eq!(
                contract.set_address(name.clone(), accounts.bob),
                Err(Error::CallerIsNotOwner)
            );

            set_next_caller(accounts.bob);
            // Now owner is bob, `set_address` should be successful.
            assert_eq!(contract.set_address(name.clone(), accounts.bob), Ok(()));
            assert_eq!(contract.get_address(name.clone()), accounts.bob);
        }

        #[ink::test]
        fn additional_data_works() {
            let accounts = default_accounts();
            let key = String::from("twitter");
            let value = String::from("@test");
            let records = Vec::from([(key.clone(), value.clone())]);

            let domain_name = "test".to_string();

            set_next_caller(accounts.alice);
            let mut contract = DomainNameService::new(None);
            assert_eq!(contract.register(domain_name.clone()), Ok(()));

            assert_eq!(
                contract.set_all_records(domain_name.clone(), records.clone()),
                Ok(())
            );
            assert_eq!(
                contract
                    .get_record(domain_name.clone(), key.clone())
                    .unwrap(),
                value.clone()
            );

            /* Confirm idempotency */
            assert_eq!(
                contract.set_all_records(domain_name.clone(), records.clone()),
                Ok(())
            );
            assert_eq!(
                contract
                    .get_record(domain_name.clone(), key.clone())
                    .unwrap(),
                value.clone()
            );

            /* Confirm overwriting */
            assert_eq!(
                contract.set_all_records(
                    domain_name.clone(),
                    Vec::from([("twitter".to_string(), "@newtest".to_string())])
                ),
                Ok(())
            );
            assert_eq!(
                contract.get_all_records(domain_name.clone()).unwrap(),
                Vec::from([("twitter".to_string(), "@newtest".to_string())])
            );
        }
    }
}
