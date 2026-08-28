import React, { useState } from "react";

function Game() {

    const choices = ["👊", "✋", "✌️"];

    const [playerChoice, setPlayerChoice] = useState(null);
    const [computerChoice, setcomputerChoice] = useState(null);
    const [result, setresult] = useState("");
    const [playerScore, setPlayerScore] = useState(0);
    const [computerScore, setComputerScore] = useState(0);
    const [resultColor, setResultColor] = useState("");

    function playGame(playerpick) {
        const computerpick = choices[Math.floor(Math.random() * 3)];
        let newResult;

        if(playerpick === computerpick) {
                newResult = "IT'S A TIE!";
            }else {
                switch(playerpick) {
                    case "👊" : 
                    newResult = computerpick === "✌️" ? "YOU WIN!" : "YOU LOSE!";
                    break;

                    case "✋" : 
                    newResult = computerpick === "👊" ? "YOU WIN!" : "YOU LOSE!";
                    break;

                    case "✌️" : 
                    newResult = computerpick === "✋" ? "YOU WIN!" : "YOU LOSE!";
                    break;
            }
        } 

        setPlayerChoice(playerpick);
        setcomputerChoice(computerpick);
        setresult(newResult);

        if(newResult === "YOU WIN!") {
            setResultColor("greenText");
            setPlayerScore(prev => prev + 1);
        } else if(newResult === "YOU LOSE!") {
            setResultColor("redText");
            setComputerScore(prev => prev + 1)
        } else {
            setResultColor("");
        }

    }

    return (
        <>
            <h1>Rock - Paper - Scissors</h1>

            <div className="choises">
                {choices.map(choice => (
                    <button key={choice} onClick={() => playGame(choice)}>
                        {choice}
                    </button>
                ))}
            </div>

            <div className="playerDisplay">
                PLAYER: {playerChoice}
            </div>

            <div className="computerDisplay">
                COMPUTER: {computerChoice}
            </div>

            <div id="resultDisplay" className={resultColor}>{result}</div>

            <div className="scores">
                Player Score: <span className="greenText">{playerScore}</span>
            </div>
            
            <div className="scores">
                Computer Score: <span className="redText">{computerScore}</span>
            </div>
        </>
    );
}

export default Game