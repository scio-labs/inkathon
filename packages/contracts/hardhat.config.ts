import '@nomicfoundation/hardhat-toolbox'
import * as dotenv from 'dotenv'
import 'hardhat-deploy'
import { HardhatUserConfig } from 'hardhat/config'
dotenv.config()

const accounts = [
  ...(process.env.PRIVATE_KEY_01 ? [`${process.env.PRIVATE_KEY_01}`] : []),
  ...(process.env.PRIVATE_KEY_02 ? [`${process.env.PRIVATE_KEY_02}`] : []),
]

const config: HardhatUserConfig = {
  solidity: '0.8.9',
  networks: {
    hardhat: {
      chainId: 1337,
      // allowUnlimitedContractSize: false,
      // blockGasLimit: 20000000,
      //   forking: {
      //     url: "https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_API_MUMBAI}",
      //     url: "https://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_API_RINKEBY}",
      //     url: "https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_MAINNET}",
      //   },
    },
    mumbai: {
      chainId: 80001,
      url: process.env.RPC_80001 || 'https://rpc.ankr.com/polygon_mumbai',
      accounts,
    },
    goerli: {
      chainId: 5,
      url: process.env.RPC_5 || 'https://rpc.ankr.com/eth_goerli',
      accounts,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  verify: {
    etherscan: {
      apiKey: `${process.env.ETHERSCAN_API_KEY}`,
    },
  },
}

export default config
