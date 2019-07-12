import React, {useState, useEffect} from 'react';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import Spinner from './components/Spinner';
import Cotizacion from './components/Cotizacion'

import axios from 'axios'

function App() {
  const [moneda, setMoneda] = useState('');
  const [criptomoneda, setCriptomoneda] = useState('');
  const [cargando, setCargando] = useState(false);
  const [resultado, setResultado] = useState({})


  useEffect(()=>{
      const cotizarCripto = async() => {


        //NO EJECUTAR AL INICIO
        if (moneda === "") return;


        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

        const resultado = await axios.get(url);

        console.log()
        
        //mostrar spinner
        setCargando(true);
        // Guardar Spinner y agregar el resultado

        setTimeout(()=>{

          setCargando(false)
          setResultado(resultado.data.DISPLAY[criptomoneda][moneda])
        },3000)

      }

      cotizarCripto()
  },[criptomoneda, moneda])


 //Mostrar Spinner

 const componente = (cargando ? <Spinner/>:<Cotizacion resultado= {resultado}/>)

  return (
    <div className="container">
      <div className="row">
        <div className="one-half column">
          <img src={imagen} alt="imagen" className="logotipo"/>
        </div>
        <div className="one-half column">
          <h1>Cotiza  criptomonedas</h1>
          <Formulario
            setMoneda = {setMoneda}
            setCriptomoneda= {setCriptomoneda}
          
          />
          {componente}
        </div>
      </div>
    </div>
  );
}

export default App;
