import React, { useState } from 'react'
import Error from './Error';

const Formulario = ({ plateau, setPlateau, rovers, setRovers }) => {

  const [plateauX, setPlateauX] = useState('');
  const [plateauY, setPlateauY] = useState('');
  const [roverX, setRoverX] = useState('');
  const [roverY, setRoverY] = useState('');
  const [roverCardinalPoint, setRoverCardinalPoint] = useState('');
  const [instructions, setInstructions] = useState('');

  const [error, setError] = useState(false);

  const generateId = () => {
    const random = Math.random().toString(36).substring(2);
    const date = Date.now().toString(36);

    return random + date;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    //form validation
    if([ plateauX, plateauY, roverX, roverY, roverCardinalPoint, instructions ].includes('')) {
      setError(true);
      return;
    }

    setError(false);

    //plateau object
    const plateau = {
      x: plateauX,
      y: plateauY
    }

    setPlateau(plateau)

    //rovers object
    const roversObject = {
      roverX,
      roverY,
      roverCardinalPoint,
      instructions,
      id: generateId()
    }

    setRovers([...rovers, roversObject]);

    //Reiniciar el formulario
    setRoverX('');
    setRoverY('');
    setRoverCardinalPoint('');
    setInstructions('');
  }

  return (
    <div className='md:w-1/2 lg:w-2/5 mx-5'>

      <p className='text-base mt-5 mb-10 text-center'>
        Plateau and {''}
        <span className='text-sky-600 font-bold'>Rover Information</span>
      </p>

      <form onSubmit={handleSubmit} className='bg-white shadow-md rounded-lg py-10 px-5 mb-10'>
        {error && <Error><p>All fields are required</p></Error> }
        <div className='mb-5'>
          <label
          className='block text-gray-700 uppercase font-bold'
          >Plateau coordinates</label>
          <div className='flex gap-3 items-center'>
            <p>x=</p>
            <input
            id='plateauX'
            type="number"
            min={1}
            value={plateauX}
            onChange={(e) => setPlateauX(e.target.value)}
            placeholder='0'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            />
            <p>y=</p>
            <input
            id='plateauY'
            type="number"
            min={1}
            value={plateauY}
            onChange={(e) => setPlateauY(e.target.value)}
            placeholder='0'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            />
          </div>
        </div>
        <div className='mb-5'>
          <p
          className='block text-gray-700 uppercase font-bold'
          >Rover Information</p>
          <label className='text-gray-500 text-sm mt-1'>Initial Position</label>
          <div className='flex gap-3 items-center'>
            <p>x=</p>
            <input
            id='roverX'
            type="number"
            min={0}
            value={roverX}
            onChange={(e) => setRoverX(e.target.value)}
            placeholder='0'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            />
            <p>y=</p>
            <input
            id='roverY'
            type="number"
            min={0}
            value={roverY}
            onChange={(e) => setRoverY(e.target.value)}
            placeholder='0'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            />
          </div>
        </div>
        <div className='mb-5'>
          <label
          className='block text-gray-500 text-sm'
          htmlFor="cardinal">Cardinal Position</label>
          <select
          id='cardinal'
          type="text"
          value={roverCardinalPoint}
          onChange={(e) => setRoverCardinalPoint(e.target.value)}
          placeholder='LMLMLMLMM'
          className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'>
            <option disabled selected hidden></option>
            <option value={'N'}>{'North'}</option>
            <option value={'S'}>{'South'}</option>
            <option value={'E'}>{'East'}</option>
            <option value={'W'}>{'West'}</option>

          </select>
        </div>
        <div className='mb-5'>
          <label
          className='block text-gray-500 text-sm'
          htmlFor="instructions">Instructions</label>
          <input
          id='instructions'
          type="text"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder='LMLMLMLMM'
          className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          />
        </div>

        <input
        type="submit"
        className='bg-sky-600 w-full p-3 text-sm text-white uppercase font-bold hover:bg-sky-700 cursor-pointer transition-all'
        value='Add Rover' />

      </form>
    </div>
  )
}

export default Formulario
