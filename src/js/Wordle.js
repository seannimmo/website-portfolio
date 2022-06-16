import React, {useState} from 'react';
import "../css/Wordle.css";
import words from "./SixLetterWords.js"

const randomNum = Math.floor(Math.random() * words.length);
const chosenWordString = words[randomNum].toUpperCase();
const chosenWordArray = chosenWordString.split("");

const Wordle = () => {
    const wordLength = chosenWordString.length;
    const board = Array(wordLength);
    for(let i=0; i<board.length; i++){
        board[i] = [];
        for(let j=0; j<wordLength; j++){
            board[i][j] = {
                char: "",
                color: "white",
            };
        }
    }

    const [hasWon, changeHasWon] = useState(false);
    const [boardState, changeBoardState] = useState(board);
    const [currentRow, changeCurrentRow] = useState(0);
    const [currentSquare, changeCurrentSquare] = useState(0);
    
    const keyPressed = (e) => {
        console.log(e);
        // TODO: Correct number of yellows. Check if guess in wordlist. Lose condition. Keyboard that shows guessed letters. 
        // Rules for rows: 
        //Can only add char if there is space on row.
        //can only backspace if there is at least one char on row.
        //to go to next row, press enter
        //can only press enter if row is full. 

        if(65 <= e.keyCode && e.keyCode <= 90 && currentSquare <= wordLength - 1){
            addNextChar(e.key)
            changeCurrentSquare(currentSquare + 1);
        } else if(e.key === "Backspace" && currentSquare > 0){
            removeLastChar()
            changeCurrentSquare(currentSquare - 1);
        } else if(e.key === "Enter" && currentSquare === 6){
            checkGuess();
        }
        console.log(boardState)
    }

    const addNextChar = (char) => {
        let firstEmpty = true;
        const nextState = boardState.map(row => {
            return row.map(square => {
                if(square.char === "" && firstEmpty === true){
                    firstEmpty = false;
                    return {...square, char: char.toUpperCase()};
                }
                else {
                    return square;
                }
            })
        })
        changeBoardState(nextState);
    }

    const removeLastChar = () => {
        const nextState = boardState.map((row, row_index) => {
            return row.map((square, square_index) => {
                if(row_index === currentRow && (square_index === currentSquare - 1)){
                    return {...square, char: ""};
                }
                else {
                    return square;
                }
            })
        })
        changeBoardState(nextState);
    }

    const checkGuess = () => {
        //Rules: If letter is in correct place, turn green
        const guessArray = (boardState[currentRow]).map(square => {
            return square.char;
        });
        const guessString = guessArray.join("");
        console.log(guessString);
        console.log(chosenWordString);
        console.log(guessArray);
        console.log(chosenWordArray);
        const newArray = boardState[currentRow].map((square, index) => {
            if(square.char === chosenWordArray[index]){
                return {...square, color: "green"};
            } else if(chosenWordArray.includes(guessArray[index])) {
                return {...square, color: "yellow"}; 
            } else {
                return square;
            }
        })

        const newBoardState = boardState.map((row, index) => {
            if(index === currentRow){
                return newArray;
            } else{
                return row;
            }
        })
        if(guessString === chosenWordString){
            changeHasWon(true);
        }

        changeBoardState(newBoardState);
        changeCurrentRow(currentRow + 1);
        changeCurrentSquare(0);
    }

    return (
        <div className="wordle-board" tabIndex={-1} onKeyDown={keyPressed} >
           {boardState.map((row, index) => {
            return <Row row={row} key={index}/>
           })}
           {/* Javascript evaluates next statement as true, so it includes it.  TRUE && TRUE */}
           {hasWon && <div> You win! </div>}

        </div>

    )
}
const Row = ({row}) => {
    return (
        <div className="wordle-row" > 
            {row.map((square, index) => {
                return <Square square={square} key={index} />
                })
            }
        </div>
    )
}

const Square = ({square}) => {

    return (
        <div className= "wordle-square" style={{background: square.color}}> 
            {square.char}
        </div>
    )
}


export default Wordle;