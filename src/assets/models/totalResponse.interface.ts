import { CharResponse } from './charResponse.interface';

export interface TotalResponse {
    info: {
        count: number;
        next: string;
        pages: number;
        prev: string;
    };
    results: CharResponse[];
}