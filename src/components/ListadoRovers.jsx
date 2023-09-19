import React from 'react'
import Rover from './Rover'

const ListadoRovers = ({rovers}) => {
  return (
    <div className='w-full md:w-1/2 lg:w/3/5 md:h-screen overflow-y-auto'>
      <p className='text-base mt-5 mb-10 text-center'>
        Rovers {''}
        <span className='text-sky-600 font-bold'>List</span>
      </p>
      {
        rovers.map(rover => (
          <Rover
          key={rover.id}
          rover={rover}/>
        ))
      }
    </div>
  )
}

export default ListadoRovers
