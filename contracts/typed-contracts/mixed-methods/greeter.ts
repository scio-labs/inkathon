/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@prosopo/typechain-types';
import type { QueryReturnType } from '@prosopo/typechain-types';
import { queryOkJSON, queryJSON, handleReturnType } from '@prosopo/typechain-types';
import { txSignAndSend } from '@prosopo/typechain-types';
import type * as ArgumentTypes from '../types-arguments/greeter';
import type * as ReturnTypes from '../types-returns/greeter';
import type BN from 'bn.js';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {ReturnNumber} from '@prosopo/typechain-types';
import {getTypeDescription} from './../shared/utils';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { EventRecord } from '@polkadot/types/interfaces';
import {decodeEvents} from "../shared/utils";
import DATA_TYPE_DESCRIPTIONS from '../data/greeter.json';
import EVENT_DATA_TYPE_DESCRIPTIONS from '../event-data/greeter.json';


export default class Methods {
	readonly __nativeContract : ContractPromise;
	readonly __keyringPair : KeyringPair;
	readonly __callerAddress : string;
	readonly __apiPromise: ApiPromise;

	constructor(
		apiPromise : ApiPromise,
		nativeContract : ContractPromise,
		keyringPair : KeyringPair,
	) {
		this.__apiPromise = apiPromise;
		this.__nativeContract = nativeContract;
		this.__keyringPair = keyringPair;
		this.__callerAddress = keyringPair.address;
	}

	/**
	* greet
	*
	* @returns { Result<string, ReturnTypes.LangError> }
	*/
	"greet" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<string, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "greet", [], __options, (result) => { return handleReturnType(result, getTypeDescription(5, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setMessage
	*
	* @param { string } newValue,
	* @returns { void }
	*/
	"setMessage" (
		newValue: string,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "setMessage", (events: EventRecord[]) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [newValue], __options);
	}

}