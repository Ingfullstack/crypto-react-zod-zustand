import { ChangeEvent, FormEvent, useState } from "react";
import { currencies } from "../data"
import { useCriptoStore } from "../store"
import { Pair } from "../types";
import ErrorMenssage from "./ErrorMenssage";

function CriptoSearchForm() {

    const cryptocurrencies = useCriptoStore(state => state.cryptocurrencies);
    const fetchData = useCriptoStore(state => state.fetchData);
    const [pair, setPair] = useState<Pair>({
        currency: '',
        criptocurrency: ''
    });
    const [error, setError] = useState<string>('');

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setPair({
            ...pair,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (Object.values(pair).includes('')) {
            setError("Todo los campos son obligatorios");
            return;
        }
        fetchData(pair);
        setError('')
        setPair({
            currency: '',
            criptocurrency: ''
        })
    }
    
  return (
    <form onSubmit={handleSubmit} className="form">
        { error && <ErrorMenssage>{error}</ErrorMenssage> }
        <div className="field">
            <label htmlFor="currency">Moneda:</label>
            <select name="currency" id="currency" value={pair.currency} onChange={handleChange}>
                <option value="">Seleccione</option>
                { currencies.map(item => (
                    <option key={item.code} value={item.code}>{item.name}</option>
                ))}
            </select>
        </div>

        <div className="field">
            <label htmlFor="criptocurrency">Criptomoneda:</label>
            <select name="criptocurrency" id="criptocurrency" value={pair.criptocurrency} onChange={handleChange}>
                <option value="">Seleccione</option>
                { cryptocurrencies.map(item => (
                    <option key={item.CoinInfo.Name} value={item.CoinInfo.Name}>{item.CoinInfo.FullName}</option>
                ))}
            </select>
        </div>

        <input type="submit" value="Cotizar" />
    </form>
  )
}

export default CriptoSearchForm