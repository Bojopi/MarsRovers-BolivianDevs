const Rover = ({rover}) => {

    const {roverX, roverY, roverCardinalPoint, instructions} = rover;

    const getCardinalPoint = (cardinal) => {
      switch(cardinal) {
        case 'N':
          return 'North';
        case 'S':
          return 'South';
        case 'E':
          return 'East';
        case 'W':
          return 'West';
        default:
          break;
      }
    }

  return (
    <div className='mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl'>
        <p className='text-sm font-bold mb-3 text-gray-700 uppercase'>Rover coordinates:</p>
        <div className="w-full grid md:grid-cols-2 grid-cols-1 mb-3">
          <p className="col-span-1">x = <span className='font-normal normal-case'>{roverX}</span></p>
          <p className="col-span-1">y = <span className='font-normal normal-case'>{roverY}</span></p>
        </div>
        <p className='text-sm font-bold mb-3 text-gray-700 uppercase'>Cardinal Point <span className='font-normal normal-case'>{getCardinalPoint(roverCardinalPoint)}</span></p>
        <p className='text-sm font-bold mb-3 text-gray-700 uppercase'>Instructions: {''}
          <span className='font-normal normal-case'>{instructions}</span>
        </p>
    </div>
  )
}

export default Rover
