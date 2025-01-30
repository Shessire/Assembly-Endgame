import { languages } from "../../languages"

export default function Header () {
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
        </section>
    )
}