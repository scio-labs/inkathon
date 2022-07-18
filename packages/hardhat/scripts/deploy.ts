import '@nomicfoundation/hardhat-toolbox'
import { ethers } from 'hardhat'
import { saveFrontendAddressFiles } from '../shared/saveFrontendAddressFiles'

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000)
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS

  const lockedAmount = ethers.utils.parseEther('1')

  const Lock = await ethers.getContractFactory('Lock')
  const lock = await Lock.deploy(unlockTime, { value: lockedAmount })

  await lock.deployed()

  console.log('Lock with 1 ETH deployed to:', lock.address)

  saveFrontendAddressFiles({
    Lock: lock.address,
  })
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
