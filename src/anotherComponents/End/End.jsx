import React from "react";
import s from "./End.module.css";

let End = (props) => {
    return (
        <div className={s.container}>
            <div className={s.winner}>
                <p className={s.won}>
                    {props.winner === "x"
                        ? "X won"
                        : props.winner === "o"
                        ? "O won"
                        : "Draw"}
                </p>
                <button
                    className={s.again}
                    onClick={() => {
                        props.setStartValue();
                    }}
                >
                    Play again
                </button>
            </div>
        </div>
    );
};

export default End;
