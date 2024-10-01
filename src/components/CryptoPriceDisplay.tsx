import { useCriptoStore } from "../store"
import Spinner from "./Spinner";

function CryptoPriceDisplay() {

    const result = useCriptoStore(state => state.result);
    const loading = useCriptoStore(state => state.loading);
    const hasResul = result.PRICE;

  return (
    <div className="result-wrapper">
      {loading ? <Spinner/> : hasResul && (
        <>
          <h2>Cotizacion</h2>
          <div className="result">
            <img src={`https://cryptocompare.com/${result.IMAGEURL}`} alt="" />
            <div>
              <p>
                El precio es de: <span>{result.PRICE}</span>
              </p>
              <p>
                Precio mas alto del dia: <span>{result.HIGHDAY}</span>
              </p>
              <p>
              Precio mas bajo del dia: <span>{result.LOWDAY}</span>
              </p>
              <p>
              Variacion ultima 24 horas: <span>{result.CHANGEPCT24HOUR}</span>
              </p>
              <p>
                Ultima actualizacion: <span>{result.LASTUPDATE}</span>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CryptoPriceDisplay