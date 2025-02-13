import { useState } from "react"
import { clsx } from "clsx"
import { languages } from "../../languages"
import { getFarewellText, getRandomWord } from "../../utils"

export default function Header () {
    const [currentWord, setCurrentWord] = useState(() => getRandomWord())
    const [guess, setGuess] = useState([])

    const numGuessesLeft = languages.length - 1
    const wrongGuessCount = guess.filter(letter => !currentWord.includes(letter)).length
    const isGameWon = currentWord.split("").every(letter => guess.includes(letter))
    const isGameLost = wrongGuessCount >= numGuessesLeft
    const isGameOver = isGameWon || isGameLost
    const lastGuessedLetter = guess[guess.length - 1]
    const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)

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

    const gameStatusClass = clsx("game-status", {
        won: isGameWon,
        lost: isGameLost,
        farewell: !isGameOver && isLastGuessIncorrect
    })

    return (
        <section className="Header">
            <h1>Assembly: Endgame</h1>
            <p>Guess the word within 8 attempts to keep the programming
                world safe from Assembly!
            </p>
            <section 
                aria-live="polite" 
                role="status" 
                className={gameStatusClass}>
            {
                isGameOver ? (
                    isGameWon ? (
                        <>
                            <h2>You win!</h2>
                            <p>Well done! 🎉</p>
                        </>
                    ) : (
                        <>
                            <h2>Game over!</h2>
                            <p>You lose! Better start learning Assembly 😈</p>
                        </>
                    )
                ) : !isGameOver && isLastGuessIncorrect ? (
                    <p className="farewell-message">
                        {getFarewellText(languages[wrongGuessCount - 1].name)}
                    </p>
                ) : (
                    null
                )
            }
            </section>
            <div className="language-chips">
                {
                    languages.map((l, index) => {
                        const isLanguageLost = index < wrongGuessCount

                        return (
                            <span 
                                key={l.name} 
                                className={`chip ${isLanguageLost ? "lost" : ""}`}
                                style={{ backgroundColor: l.backgroundColor, 
                                    color: l.color}}
                            >
                                {l.name}
                            </span>
                        )
                    })
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

            <div 
                className="sr-only" 
                aria-live="polite" 
                role="status"
            >
                <p>
                    {currentWord.includes(lastGuessedLetter)
                    ? `Correct! The letter ${lastGuessedLetter} is in the word.`
                    : `Sorry, the letter ${lastGuessedLetter} is not in the word.`
                    }
                    You have {numGuessesLeft} attempts left.
                </p>
                <p>
                    Current word: {currentWord.split("").map(letter =>
                    guess.includes(letter) ? letter + "." : "blank."
                ).join(" ")}
                </p>
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
                                    aria-disabled={guess.includes(k)}
                                    aria-label={`Letter ${k}`}
                                    disabled = {isGameOver}
                                >
                                    {k.toUpperCase()}
                                </button>
                            )
                    })
                }
            </div>
            {
                isGameOver
                ? <button className="new-game">New Game</button>
                : null
            }
        </section>
    )
}