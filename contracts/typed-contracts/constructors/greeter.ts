import type { ConstructorOptions } from '@727-ventures/typechain-types'
import {
  _genValidGasLimitAndValue,
  _signAndSend,
  SignAndSendSuccessResponse,
} from '@727-ventures/typechain-types'
import type { ApiPromise } from '@polkadot/api'
import { CodePromise } from '@polkadot/api-contract'
import type { KeyringPair } from '@polkadot/keyring/types'
import type { WeightV2 } from '@polkadot/types/interfaces'
import { ContractFile } from '../contract-info/greeter'

export default class Constructors {
  readonly nativeAPI: ApiPromise
  readonly signer: KeyringPair

  constructor(nativeAPI: ApiPromise, signer: KeyringPair) {
    this.nativeAPI = nativeAPI
    this.signer = signer
  }

  /**
   * new
   *
   * @param { string } initValue,
   */
  async new(initValue: string, __options?: ConstructorOptions) {
    const __contract = JSON.parse(ContractFile)
    const code = new CodePromise(this.nativeAPI, __contract, __contract.source.wasm)
    const gasLimit = (await _genValidGasLimitAndValue(this.nativeAPI, __options))
      .gasLimit as WeightV2

    const storageDepositLimit = __options?.storageDepositLimit
    const tx = code.tx['new']!(
      { gasLimit, storageDepositLimit, value: __options?.value },
      initValue,
    )
    let response

    try {
      console.log('sd')
      response = await _signAndSend(this.nativeAPI.registry, tx, this.signer, (event: any) => event)
    } catch (error) {
      console.log(error)
    }

    return {
      result: response as SignAndSendSuccessResponse,
      // @ts-ignore
      address: (response as SignAndSendSuccessResponse)!.result!.contract.address.toString(),
    }
  }
  /**
   * default
   *
   */
  async default(__options?: ConstructorOptions) {
    const __contract = JSON.parse(ContractFile)
    const code = new CodePromise(this.nativeAPI, __contract, __contract.source.wasm)
    const gasLimit = (await _genValidGasLimitAndValue(this.nativeAPI, __options))
      .gasLimit as WeightV2

    const storageDepositLimit = __options?.storageDepositLimit
    const tx = code.tx['default']!({ gasLimit, storageDepositLimit, value: __options?.value })
    let response

    try {
      console.log('this.signer', this.signer)
      response = await _signAndSend(this.nativeAPI.registry, tx, this.signer, (event: any) => event)
    } catch (error) {
      console.log(error)
    }

    return {
      result: response as SignAndSendSuccessResponse,
      // @ts-ignore
      address: (response as SignAndSendSuccessResponse)!.result!.contract.address.toString(),
    }
  }
}
