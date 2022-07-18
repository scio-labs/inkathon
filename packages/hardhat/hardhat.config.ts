import '@nomicfoundation/hardhat-toolbox'
import * as dotenv from 'dotenv'
import { HardhatUserConfig } from 'hardhat/config'
import path from 'path'
dotenv.config()

const config: HardhatUserConfig = {
  solidity: '0.8.9',
  paths: {
    artifacts: path.resolve('../frontend/src/artifacts'),
  },
  networks: {
    hardhat: {
      chainId: 1337,
      //   chainId: 80001,
      //   allowUnlimitedContractSize: false,
      //   blockGasLimit: 20000000, // 20 million
      //   forking: {
      //     url: "https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_API_MUMBAI}",
      //     url: "https://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_API_RINKEBY}",
      //     url: "https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_MAINNET}",
      //   },
    },
    rinkeby: {
      chainId: 4,
      url: `https://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_API_RINKEBY}`,
      accounts: [
        ...(process.env.PRIVATE_KEY_RINKEBY ? [`${process.env.PRIVATE_KEY_RINKEBY}`] : []),
      ],
    },
    mumbai: {
      chainId: 80001,
      url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_API_MUMBAI}`,
      accounts: [...(process.env.PRIVATE_KEY_MUMBAI ? [`${process.env.PRIVATE_KEY_MUMBAI}`] : [])],
    },
  },
  typechain: {
    outDir: path.resolve('../frontend/src/types/typechain'),
  },
  etherscan: {
    apiKey: `${process.env.ETHERSCAN_API_KEY}`,
  },
}

export default config
