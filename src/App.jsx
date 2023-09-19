import { useEffect, useState } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import ListadoRovers from './components/ListadoRovers';
import RoversMovement from './components/RoversMovement';
// import './App.css'

function App() {

  const [plateau, setPlateau] = useState({x: '0', y: '0'})
  const [rovers, setRovers] = useState([]);

  const [showGrid, setShowGrid] = useState(false);

  useEffect(() => {
    if(rovers.length > 0) {
      setShowGrid(true);
    }
  }, [rovers])

  return (
    <div className='container mx-auto mt-20 mb-10'>
      <Header />

      <div className='mt-12 md:flex'>
        <Formulario
        plateau={plateau}
        setPlateau={setPlateau}
        rovers={rovers}
        setRovers={setRovers} />

        <ListadoRovers 
        rovers={rovers}/>
      </div>
      {
        showGrid &&
        <RoversMovement 
        rovers={rovers}
        setRovers={setRovers}
        plateau={plateau}/>
      }
    </div>
  )
}

export default App
