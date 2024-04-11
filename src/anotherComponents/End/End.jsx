import React from "react";
import s from "./End.module.css";
import sl from "../../App.module.css";

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
                    onClick={(e) => {
                        props.setStartValue();
                        const end = document.querySelector(`.${sl.end}`);
                        end.classList.remove(sl.endActive);
                        setTimeout(() => {
                            props.switchIsEnd();
                        }, 1000);
                    }}
                >
                    Play again
                </button>
            </div>
        </div>
    );
};

export default End;
