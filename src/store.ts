import { create } from "zustand";
import { CryptoCurrency, CryptoPrice, Pair } from "./types";
import { devtools } from 'zustand/middleware'
import { fetchCurrentCryptoPrice, getCrypto } from "./services/CryptoService";

type CryptoState = {
    cryptocurrencies: CryptoCurrency[];
    result: CryptoPrice
    fetchCrypto: () => Promise<void>;
    fetchData: (pair: Pair) => void;
    loading: boolean
}

export const useCriptoStore = create<CryptoState>()(devtools((set) => ({
    cryptocurrencies: [],
    loading: false,
    result: {} as CryptoPrice,

    fetchCrypto: async () => {
        const cryptocurrencies = await getCrypto();
        set(() => ({
            cryptocurrencies
        }))
    },

    fetchData: async (pair: Pair) => {
        set(() => ({
            loading: true
        }))
        const result = await fetchCurrentCryptoPrice(pair);
        set(() => ({
            result,
            loading: false
        }))
    }
})))