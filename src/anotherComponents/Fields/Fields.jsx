import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import s from "./Fields.module.css";
import {
    setNewValue,
    checkWinner,
    setAIMoveThunk,
} from "../../BLL/tictactoe-reducer";
import cn from "classnames";
import { CSSTransition } from "react-transition-group";

const Fields = (props) => {
    const [win, setWin] = useState("");
    useEffect(() => {
        Object.keys(props.wichLineWon).forEach((e) => {
            if (props.wichLineWon[e]) {
                setWin(e);
            }
        });
    }, [props.wichLineWon]);

    useEffect(() => {
        if (!win) {
            props.checkWinner(
                props.fields,
                "x",
                "o",
                props.freeFields,
                props.isDraw
            );
        }
    }, [props.fields]);
    useEffect(() => {
        let elem = document.getElementById(`${props.wichFieldChanged}`);

        if (elem === null) {
            return;
        } else {
            elem.classList.add(s.busy);
        }
    }, [props.wichFieldChanged]);

    useEffect(() => {
        const allFields = document.querySelectorAll(`.${s.busy}`);
        setTimeout(() => {
            setWin("");
        }, 400);
        setTimeout(() => {
            allFields.forEach((e) => {
                e.classList.remove(s.busy);
            });
        }, 400);
    }, [props.isEnd]);
    return (
        <div className={s.fields}>
            <div
                className={cn(s.container, s[`${win}`], {
                    [s.blockContent]: win,
                })}
            >
                <span className={s.topLine}></span>
                <span className={s.centerLine}></span>
                <span className={s.bottomLine}></span>

                <span className={s.leftLine}></span>
                <span className={s.centerLineH}></span>
                <span className={s.rightLine}></span>

                <span className={s.leftR}></span>
                <span className={s.rightR}></span>

                {props.allFields.map((f) => {
                    return (
                        <div
                            id={f}
                            className={`${s.field} `}
                            key={f}
                            onClick={(e) => {
                                if (props.isEnd) {
                                    return;
                                }
                                if (props.fields[f]) {
                                    return;
                                }
                                if (props.isMyMove) {
                                    return;
                                }
                                let arr = props.freeFields.filter((k) => {
                                    if (f === k) return true;
                                });
                                if (arr.length === 1) {
                                    props.setNewValue(1, f);
                                }
                                e.target.classList.add(s.busy);
                                props.setAIMoveThunk();
                            }}
                        >
                            <>
                                <CSSTransition
                                    in={props.fields[`${f}`] === "x"}
                                    classNames={{
                                        enter: s["tic-enter"],
                                        enterActive: s["tic-enter-active"],
                                        exit: s["tic-exit"],
                                        exitActive: s["tic-exit-active"],
                                        enterDone: s["tic-done-enter"],
                                    }}
                                    timeout={500}
                                    unmountOnExit
                                >
                                    <div className={s.figureWrapper}>
                                        <span
                                            className={`${s.k1} ${s.k}`}
                                        ></span>
                                        <span
                                            className={`${s.k2} ${s.k}`}
                                        ></span>
                                    </div>
                                </CSSTransition>

                                <CSSTransition
                                    in={props.fields[`${f}`] === "o"}
                                    classNames={{
                                        enter: s["circle-enter"],
                                        enterActive: s["circle-enter-active"],
                                        exit: s["circle-exit"],
                                        exitActive: s["circle-exit-active"],
                                        enterDone: s["circle-done-enter"],
                                    }}
                                    timeout={500}
                                    unmountOnExit
                                >
                                    <div className={s.figureWrapper}>
                                        <span className={s.c1}></span>
                                    </div>
                                </CSSTransition>
                            </>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        fields: state.ticTacToe.fields,
        allFields: state.ticTacToe.fieldsArr,
        freeFields: state.ticTacToe.freeFields,
        isMyMove: state.ticTacToe.ai.isMyMove,
        wichLineWon: state.ticTacToe.wichLineWon,
        winnerLine: state.ticTacToe.winnerLine,
        isEnd: state.ticTacToe.isEnd,
        isDraw: state.ticTacToe.isDraw,
        wichFieldChanged: state.ticTacToe.wichFieldChanged,
    };
};

export default connect(mapStateToProps, {
    setNewValue,
    checkWinner,
    setAIMoveThunk,
})(Fields);
