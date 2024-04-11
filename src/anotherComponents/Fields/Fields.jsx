import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import s from "./Fields.module.css";
import {
    setNewValue,
    checkWinner,
    setAIMoveThunk,
} from "../../BLL/tictactoe-reducer";
import cn from "classnames";

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
    function addingClass(elem) {
        setTimeout(() => {
            elem.classList.add(s.busy);
        }, 5);
    }
    useEffect(() => {
        let elem = document.getElementById(`${props.wichFieldChanged}`);

        if (elem === null) {
            return;
        } else {
            addingClass(elem);
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

                                setTimeout(() => {
                                    e.target.classList.add(s.busy);
                                }, 0);
                                props.setAIMoveThunk();
                            }}
                        >
                            {props.fields[`${f}`] === "x" ? (
                                <>
                                    <span className={`${s.k1} ${s.k}`}></span>
                                    <span className={`${s.k2} ${s.k}`}></span>
                                </>
                            ) : props.fields[`${f}`] === "o" ? (
                                <>
                                    <span className={s.c1}></span>
                                </>
                            ) : (
                                ""
                            )}
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
