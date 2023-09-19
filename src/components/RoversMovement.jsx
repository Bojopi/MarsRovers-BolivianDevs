import React, { useEffect, useState } from 'react'

const RoversMovement = ({plateau, rovers, setRovers}) => {

    const [currentRoverIndex, setCurrentRoverIndex] = useState(0);
    const [sequentialMovementStarted, setSequentialMovementStarted] = useState(false);

    const turnLeft = (orientation) => {
        switch (orientation) {
            case 'N':
                return 'W'
            case 'W':
                return 'S'
            case 'S':
                return 'E'
            case 'E':
                return 'N'
            default:
                return orientation
        }
    }
    
    const turnRight = (orientation) => {
        switch (orientation) {
            case 'N':
                return 'E'
            case 'E':
                return 'S'
            case 'S':
                return 'W'
            case 'W':
                return 'N'
            default:
                return orientation
        }
    }

    const moveRover = (roverX, roverY, orientation) => {
        let newRoverX = roverX;
        let newRoverY = roverY;

        switch (orientation) {
            case 'N':
                newRoverY += 1
                break;
            case 'S':
                newRoverY -= 1
                break;
            case 'E':
                newRoverX += 1
                break;
            case 'W':
                newRoverX -= 1
                break;
        
            default:
                break;
        }

        const {x, y} = plateau;
        if(newRoverX >= 0 && newRoverX <= x && newRoverY >= 0 && newRoverY <= y) {
            return {roverX: newRoverX, roverY: newRoverY}
        }
    }

    const orientationStyle = (orientation) => {
        switch (orientation) {
            case 'N':
                return 'border-t-4 border-red-400'
            case 'W':
                return 'border-l-4 border-red-400'
            case 'S':
                return 'border-b-4 border-red-400'
            case 'E':
                return 'border-r-4 border-red-400'
        
            default:
                break;
        }
    }

    // Render plateau
    const renderPlateau = () => {
        const { x, y } = plateau;
        let count = 0;

        // Width & Height of plateau
        const cellWidth = 60;
        const cellHeight = 60;

        const plateauStyle = {
            display: 'grid',
            gridTemplateColumns: `repeat(${Number(x) + 1}, ${cellWidth}px)`,
        };

        const cells = [];

        for (let posy = Number(y); posy >= 0; posy--) {
            for (let posx = 0; posx <= Number(x); posx++) {

                const rover = rovers.find((r) => Number(r.roverX) === posx && Number(r.roverY) === posy);

                if(rover) {
                    console.log('aqui hay un rover', rover)
                }

                cells.push(
                    <div
                        key={`cell-${posx}-${posy}`}
                        className="cell border-2 flex items-center justify-center"
                        style={{ width: cellWidth + 'px', height: cellHeight + 'px' }}
                    >
                        {rover &&
                            <div className={`bg-sky-200 w-10 h-10 rounded-md flex justify-center items-center ${orientationStyle(rover.roverCardinalPoint)}`}>
                                <p className='text-sm'>R {rover.roverX+'-'+rover.roverY}</p>
                            </div>
                        }
                    </div>
                );
            }
        }

        return <div className="plateau mx-auto w-auto h-auto border-2" style={plateauStyle}>{cells}</div>;
    };

    const moveNextRover = async () => {
        if (currentRoverIndex < rovers.length) {
            const currentRover = rovers[currentRoverIndex];
            const instructions = currentRover.instructions;
    
            for (let i = 0; i < instructions.length; i++) {
                const instruction = instructions[i];
    
                if (instruction === 'L') {
                    const updatedRover = { ...currentRover };
                    updatedRover.orientation = turnLeft(updatedRover.orientation);
                    const updatedRovers = [...rovers];
                    updatedRovers[currentRoverIndex] = updatedRover;
                    setRovers(updatedRovers);
                } else if (instruction === 'R') {
                    const updatedRover = { ...currentRover };
                    updatedRover.orientation = turnRight(updatedRover.orientation);
                    const updatedRovers = [...rovers];
                    updatedRovers[currentRoverIndex] = updatedRover;
                    setRovers(updatedRovers);
                } else if (instruction === 'M') {
                    const updatedRover = moveRover(currentRover.roverX, currentRover.roverY, currentRover.orientation);
                    if (updatedRover) {
                        const updatedRovers = [...rovers];
                        updatedRovers[currentRoverIndex] = { ...currentRover, roverX: updatedRover.roverX, roverY: updatedRover.roverY };
                        setRovers(updatedRovers);
                    }
                }
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }
            setCurrentRoverIndex(currentRoverIndex + 1);
        } else {
            setSequentialMovementStarted(false);
        }
    };

    const startSequentialMovement = () => {
        setSequentialMovementStarted(true);
        moveNextRover();
    };
    
  return (
    <div className=''>
      <div className='flex flex-col gap-5 items-center justify-center'>
        <p className='block text-center'>North</p>
        <div className='flex items-center gap-5'>
            <p>West</p>
            { renderPlateau() }
            <p>East</p>
        </div>
        <p className='block text-center'>South</p>
      </div>
      <button
        className='bg-sky-600 text-white px-3 py-2 rounded-md hover:bg-sky-700'
        onClick={startSequentialMovement}
        disabled={sequentialMovementStarted || currentRoverIndex >= rovers.length}
        >
            Start movement
        </button>
    </div>
  )
}

export default RoversMovement
