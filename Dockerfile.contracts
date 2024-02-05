FROM paritytech/ci-linux:production as builder

WORKDIR /app
COPY . .

# Switch from sh to bash
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN apt update

RUN echo "**Getting Ubuntu and Rust dependencies**"
RUN apt install -y build-essential pkg-config git clang curl libssl-dev llvm libudev-dev

RUN echo "**Installing node.js, pnpm, and package dependencies**"
# Install nvm and node
RUN mkdir -p /usr/local/nvm
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION v20.9.0
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
RUN /bin/bash -c "source $NVM_DIR/nvm.sh && nvm install $NODE_VERSION && nvm use --delete-prefix $NODE_VERSION"
ENV NODE_PATH $NVM_DIR/versions/node/$NODE_VERSION/bin
ENV PATH $NODE_PATH:$PATH
# Install pnpm
RUN npm i --global --no-update-notifier --no-fund pnpm@8
RUN yes Y | pnpm install

RUN echo "*** Instaling Rust environment for contracts node***"
RUN rm -rf /usr/local/rustup /usr/local/cargo
RUN curl https://sh.rustup.rs -sSf | sh -s -- -y --default-toolchain nightly
ENV PATH="/root/.cargo/bin:${PATH}"
RUN rustup default stable
RUN rustup update
RUN rustup target add wasm32-unknown-unknown
RUN rustup update nightly
RUN rustup target add wasm32-unknown-unknown --toolchain nightly
RUN rustup show 
RUN rustup +nightly show
RUN cargo install contracts-node

RUN echo "*** Installing cargo-contract ***"
RUN rustup component add rust-src
RUN cargo install --force --locked cargo-contract

# Set and expose the port that the app will run on
EXPOSE 9944

# RUN echo "*** Start Substrate node template ***"
CMD [ "/usr/local/cargo/bin/substrate-contracts-node", "--dev", "--rpc-cors=all"]