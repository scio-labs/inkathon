#![cfg_attr(not(feature = "std"), no_std)]

#[ink::contract]
mod greeter {
    use ink::prelude::string::String;

    #[ink(event)]
    pub struct Greeted {
        from: Option<AccountId>,
        message: String,
    }

    #[ink(storage)]
    pub struct Greeter {
        message: String,
    }

    impl Greeter {
        /// Creates a new greeter contract initialized with the given value.
        #[ink(constructor)]
        pub fn new(init_value: String) -> Self {
            Self {
                message: init_value,
            }
        }

        /// Creates a new greeter contract initialized to 'Hello ink!'.
        #[ink(constructor)]
        pub fn default() -> Self {
            let default_message = String::from("Hello ink!");
            Self::new(default_message)
        }

        /// Returns the current value of `message`.
        #[ink(message)]
        pub fn greet(&self) -> String {
            self.message.clone()
        }

        /// Sets `message` to the given value.
        #[ink(message)]
        pub fn set_message(&mut self, new_value: String) {
            self.message = new_value.clone();

            let from = self.env().caller();
            self.env().emit_event(Greeted {
                from: Some(from),
                message: new_value,
            });
        }
    }

    #[cfg(test)]
    mod tests {
        use super::*;

        #[ink::test]
        fn new_works() {
            let message = "Hello ink! v4".to_string();
            let greeter = Greeter::new(message.clone());
            assert_eq!(greeter.greet(), message);
        }

        #[ink::test]
        fn default_new_works() {
            let greeter = Greeter::default();
            let default_message = String::from("Hello ink!");
            assert_eq!(greeter.greet(), default_message);
        }

        #[ink::test]
        fn set_message_works() {
            let message_1 = String::from("gm ink!");
            let mut greeter = Greeter::new(message_1.clone());
            assert_eq!(greeter.greet(), message_1);
            let message_2 = String::from("gn");
            greeter.set_message(message_2.clone());
            assert_eq!(greeter.greet(), message_2);
        }
    }

    /// This is how you'd write end-to-end (E2E) or integration tests for ink! contracts.
    ///
    /// When running these you need to make sure that you:
    /// - Compile the tests with the `e2e-tests` feature flag enabled (`--features e2e-tests`)
    /// - Are running a Substrate node which contains `pallet-contracts` in the background
    #[cfg(all(test, feature = "e2e-tests"))]
    mod e2e_tests {
        /// Imports all the definations from the outer scope so we can use theme here.
        use super::*;

        /// A helper function used for calling contract message
        use ink_e2e::build_message;

        /// The End-to-End test `Result` type.
        type E2EResult<T> = std::result::Result<T, Box<dyn std::error::Error>>;

        /// We test that we can upload and instantiate the contract using its default constructor.
        #[ink_e2e::test]
        async fn default_works(mut client: ink_e2e::Client<C, E>) -> E2EResult<()> {
            // Given
            let default_message = String::from("Hello ink!");
            let constructor = GreeterRef::default();

            // When
            let contract_account_id = client
                .instantiate("greeter", &ink_e2e::alice(), constructor, 0, None)
                .await
                .expect("instantiate failed")
                .account_id;

            // Then
            let get_greeter = build_message::<GreeterRef>(contract_account_id.clone())
                .call(|greeter| greeter.greet());
            let get_greet_result = client
                .call_dry_run(&ink_e2e::alice(), &get_greeter, 0, None)
                .await;

            // check the default message
            // assert!(matches!(get_greet_result.return_value(), default_message));
            assert_eq!(get_greet_result.return_value(), default_message);

            Ok(())
        }

        #[ink_e2e::test]
        async fn new_works(mut client: ink_e2e::Client<C, E>) -> E2EResult<()> {
            // Given
            let default_message = String::from("Hello ink! v4");
            let constructor = GreeterRef::new(default_message.clone());

            // When
            let contract_account_id = client
                .instantiate("greeter", &ink_e2e::alice(), constructor, 0, None)
                .await
                .expect("instantiate failed")
                .account_id;

            // Then
            let get_greeter = build_message::<GreeterRef>(contract_account_id.clone())
                .call(|greeter| greeter.greet());
            let get_greet_result = client
                .call_dry_run(&ink_e2e::alice(), &get_greeter, 0, None)
                .await;

            // check the default message
            assert_eq!(get_greet_result.return_value(), default_message);

            Ok(())
        }

        #[ink_e2e::test]
        async fn set_message_works(mut client: ink_e2e::Client<C, E>) -> E2EResult<()> {
            // Given
            let message_1 = String::from("gm ink!");
            let constructor = GreeterRef::new(message_1.clone());

            // When
            let contract_account_id = client
                .instantiate("greeter", &ink_e2e::alice(), constructor, 0, None)
                .await
                .expect("instantiate failed")
                .account_id;

            // Then
            let get_greeter = build_message::<GreeterRef>(contract_account_id.clone())
                .call(|greeter| greeter.greet());
            let get_greet_result = client
                .call_dry_run(&ink_e2e::alice(), &get_greeter, 0, None)
                .await;

            // check the message 1
            assert_eq!(get_greet_result.return_value(), message_1);

            // set message 2
            // Given
            let message_2 = String::from("gn");

            let set_message_2 = build_message::<GreeterRef>(contract_account_id.clone())
                .call(|greeter| greeter.set_message(message_2.clone()));

            let _ = client
                .call(&ink_e2e::alice(), set_message_2, 0, None)
                .await
                .expect("calling `set_message` failed");

            // then
            let get_greeter = build_message::<GreeterRef>(contract_account_id.clone())
                .call(|greeter| greeter.greet());

            let get_greet_result = client
                .call_dry_run(&ink_e2e::alice(), &get_greeter, 0, None)
                .await;

            assert_eq!(get_greet_result.return_value(), message_2);

            Ok(())
        }
    }
}
