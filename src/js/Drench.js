import React, {useState} from 'react';
import '../css/Drench.css';



const Drench = () => {
    const colors = ['#edae49', '#d1495b', '#6cd4ff', '#c2eabd', '#44355b', '#ffcaaf'];
   // const squares = [...Array(14)].map(i => Array(14));
   const squares = Array(14);
   let counter = 0;
   for(let i=0; i<14;i++){
        squares[i] = [];
        for(let j=0; j<14;j++){
            let id = counter++;
            let color = getRandomColor(colors);
            let newSquare = {
                row: i,
                col: j,
                id: id,
                drenched: false,
                color: color
            }
            squares[i].push(newSquare);
        }
    }

    squares[0][0].drenched = true;
    const [squareBoard, setSquareBoard] = useState(squares);
    const [getClickCounter, setClickCounter] = useState(30);

    const handleClick = newColor => {
        //map returns a new array. you can spread objects?
        //you can't just change one element. you must create a new array.

        setClickCounter(getClickCounter - 1);
        const drenchedSquaresColored = squareBoard.map(row => {
            return row.map((square) => {
                if(square.drenched){
                    return {...square, color: newColor}
                } else {
                    return square
                }
            })
        })

        //handleDrench. Must do map twice. Once to change color of drenched. Then, to search for new squares to drench.
        //inspect array and search for indices of tiles to drench. Then loop through state and change those tiles? 
        const arrayOfIdsToDrench = bfs(drenchedSquaresColored, newColor);
        const drenchedState = drenchSquares(drenchedSquaresColored, arrayOfIdsToDrench)
        setSquareBoard(drenchedState);

        //win state
        if(getWinState(squareBoard, newColor)){
            setClickCounter("You Win!");
        }
    }

    const bfs = (squares, newColor) => {
        const arrayOfIds = [];
        const queue = [];
        //add all drenched squares to queue
        for(let i=0; i<squares.length; i++){
            for(let j=0; j<squares[0].length; j++){
                if(squares[i][j].drenched === true){
                    queue.push(squares[i][j]);
                }
            }
        }
        while(queue.length > 0){
            const discoveredSquare = queue.shift();
            const colOfSquare = discoveredSquare.col;
            const rowOfSquare = discoveredSquare.row;
            investigateHorizontal(discoveredSquare, colOfSquare, rowOfSquare, 1, squares, newColor, queue, arrayOfIds)
            investigateHorizontal(discoveredSquare, colOfSquare, rowOfSquare, -1, squares, newColor, queue, arrayOfIds)
            investigateVertical(discoveredSquare, colOfSquare, rowOfSquare, 1, squares, newColor, queue, arrayOfIds)
            investigateVertical(discoveredSquare, colOfSquare, rowOfSquare, -1, squares, newColor, queue, arrayOfIds)
        }
        return arrayOfIds;
    }


    const investigateHorizontal = (discoveredSquare, colOfSquare, rowOfSquare, j, squares, newColor, queue, arrayOfIds) => {
        if(0 <= (colOfSquare + j) && (colOfSquare + j) <= 13) {
            const squareToInvestigate = squares[rowOfSquare][colOfSquare + j];
            if((squareToInvestigate.color === newColor) && (!queue.includes(squareToInvestigate)) && !squareToInvestigate.drenched && !arrayOfIds.includes(squareToInvestigate)){
                queue.push(squareToInvestigate);
                arrayOfIds.push(squareToInvestigate);
            }
        }
    }

    const investigateVertical = (discoveredSquare, colOfSquare, rowOfSquare, i, squares, newColor, queue, arrayOfIds) => {
        if(0 <= (rowOfSquare + i) && (rowOfSquare + i) <= 13) {
            const squareToInvestigate = squares[rowOfSquare + i][colOfSquare];
            if(squareToInvestigate.color === newColor && (!queue.includes(squareToInvestigate)) && !squareToInvestigate.drenched && !arrayOfIds.includes(squareToInvestigate)){
                queue.push(squareToInvestigate);
                arrayOfIds.push(squareToInvestigate);
            }
        }
    }

    const drenchSquares = (squares, arrayOfIdsToDrench) => {
        const newState = squares.map(row => {
            return row.map((square) => {
                if(arrayOfIdsToDrench.includes(square)) {
                    return {...square, drenched: true}
                } else {
                    return square
                }
            })
        })
        return newState;
    }

    const getWinState = (squareBoard, newColor) => {
        let hasWon = true;
        squareBoard.forEach(row => {
            row.forEach(square => {
                if(newColor !== square.color){
                    hasWon = false;
                }
            })
        })
        console.log(squareBoard)
        console.log(hasWon, newColor);
        return hasWon;
    }

    return (
        <div className = 'game-board'>
            {/* the prop to pass down is the state */}
            <Board squares={squareBoard}/>
            <Palette handleClick={handleClick} colors={colors} />
            <ClickCounter getClickCounter={getClickCounter} />
        </div>
    )
}

const Board = ({squares}) => {
    return (
        <div className='board'> 
            {squares.map(array => {
                return <div key={array[0].row} className="row">
                    {array.map(square => {
                        return <Square key={square.id} square={square} />
                    })}
                </div>
            })}
        </div>
    )
}

const Palette = ({handleClick, colors}) => {
    return (
        <div className='palette'>
        {
            colors.map(color => {
                return <div key={color} onClick={() => {handleClick(color)}} style={{background: color}} className='palette-color'></div>
            })
        }
        </div>
    )
}

const Square = (props) => {
    return(
        <div className='square' style={{background: props.square.color}}></div>
    )
}

const ClickCounter = ({getClickCounter}) => {
    return (
        <div className='click-counter'>{getClickCounter}</div>
    )
}

const getRandomColor = (colors) => {
    let number = Math.floor(Math.random() * 6);
    return colors[number];

}

export default Drench