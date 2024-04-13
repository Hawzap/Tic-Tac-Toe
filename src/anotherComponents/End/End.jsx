import React from "react";
import s from "./End.module.css";

let End = ({ winner, setStartValue, switchIsEnd }) => {
    return (
        <div className={s.container}>
            <div className={s.winner}>
                <p className={s.won}>
                    {winner === "x"
                        ? "X won"
                        : winner === "o"
                        ? "O won"
                        : "Draw"}
                </p>
                <button
                    className={s.again}
                    onClick={(e) => {
                        setStartValue();
                        switchIsEnd();
                    }}
                >
                    Play again
                </button>
            </div>
        </div>
    );
};

export default End;
