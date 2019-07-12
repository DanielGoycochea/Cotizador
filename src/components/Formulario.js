import React, {useState, useEffect} from 'react';
import Criptomoneda from './Criptomoneda';
import Error from './Error' 

import axios from 'axios'

function Formulario ({setMoneda, setCriptomoneda}){

  const [criptomonedas, setcriptomonedas] = useState([]);
  const [monedaCotizar, setMonenaCotizar] = useState('');
  const [criptoCotizar, setCriptoCotizar] = useState('');
  const [error, setError] = useState(false)


  useEffect(()=>{

    const consultar = async () =>{
      const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;
      const resultado = await axios.get(url)

      setcriptomonedas(resultado.data.Data)
      
    }

    consultar()

  }, [])

//validar formulario

const cotizarMoneda = (e)=>{
  e.preventDefault();


    // validar ambos campos
    if(monedaCotizar === '' || criptoCotizar === ''){

      setError(true);
      return
    }

    setError(false)

    setMoneda(monedaCotizar);
    setCriptomoneda(criptoCotizar)

   
}
//  


//mostrar error
  

  const componente = (error) ? <Error mensaje="Ambos campos son Obligatorios"/>: null

  return (

    <form onSubmit={cotizarMoneda}>
      {componente}
      <div className="row">
        <label>Elige tu Moneda</label>
          <select  className="u-full-width" onChange={e=> setMonenaCotizar(e.target.value)}>
            <option value="">--Elige tu Moneda</option>
            <option value="USD">Dolar Americano</option>
            <option value="MXN">Peso Mexicano</option>
            <option value="GBP">Libra</option>
            <option value="EUR">Euro</option>
          </select>
      </div>
      <div className="row">
        <label> Elige la Criptomoneda</label>
        <select className="u-full-width" onChange ={e=>setCriptoCotizar(e.target.value)}
        >
          <option value="">--Elige tu Criptomoneda</option>
          {criptomonedas.map(criptomoneda =>(
            <Criptomoneda
              key={criptomoneda.CoinInfo.Id}
              criptomoneda = {criptomoneda}
            />
          ))}
        </select>
      </div>
      <input type="submit" className="button-primary u-full-width" value="Calcular"/>
    </form>
  )




}

export default Formulario;