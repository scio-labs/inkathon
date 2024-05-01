import type {ReturnNumber} from "@prosopo/typechain-types";
import type * as ReturnTypes from '../types-returns/greeter';

export interface Greeted {
	from: ReturnTypes.AccountId | null;
	message: string;
}

