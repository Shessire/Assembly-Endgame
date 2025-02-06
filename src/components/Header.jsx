import { useState } from "react"
import { clsx } from "clsx"
import { languages } from "../../languages"

export default function Header () {
    const [currentWord, setCurrentWord] = useState("react")
    const [guess, setGuess] = useState([])
    
    const alphabet = "abcdefghijklmnopqrstuvwxyz"

    const word = currentWord.split("")
    const keyboard = alphabet.split("")

    function handleClick (letter){
        setGuess(prevLetters => (
            prevLetters.includes(letter)
            ? prevLetters
            : [...prevLetters, letter]
        ))
    }

    return (
        <section className="Header">
            <h1>Assembly: Endgame</h1>
            <p>Guess the word within 8 attempts to keep the programming
                world safe from Assembly!
            </p>
            <div className="game-status">
                <h2>You win!</h2>
                <p>Well done! 🎉</p>
            </div>
            <div className="language-chips">
                {
                    languages.map((l) => (
                        <span key={l.name} className="chip" style={{ backgroundColor: l.backgroundColor,  color: l.color}}>{l.name}</span>
                    ))
                }
            </div>
            <div className="word">
                {
                    word.map((w, index) => (
                        <span 
                            key={index}
                        >
                            {guess.includes(w) ? w.toUpperCase() : ""}
                        </span>
                    ))
                }
            </div>
            <div className="keyboard">
                {
                    keyboard.map((k) => {
                        const isGuessed = guess.includes(k)
                        const isCorrect = isGuessed && currentWord.includes(k)
                        const isWrong = isGuessed && !currentWord.includes(k)
                        const className = clsx({
                            correct: isCorrect,
                            wrong: isWrong
                        })

                            return (
                                <button 
                                    className={className}
                                    key={k} 
                                    onClick={() => handleClick(k)}
                                >
                                    {k.toUpperCase()}
                                </button>
                            )
                    })
                }
            </div>
            <button className="new-game">New Game</button>
        </section>
    )
}