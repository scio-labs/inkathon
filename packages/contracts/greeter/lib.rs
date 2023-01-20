#![cfg_attr(not(feature = "std"), no_std)]

extern crate alloc;

#[ink::contract]
mod greeter {
    use alloc::string::String;

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
            self.message = new_value;
        }
    }

    #[cfg(test)]
    mod tests {
        use super::*;

        #[ink::test]
        fn default_works() {
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
}
