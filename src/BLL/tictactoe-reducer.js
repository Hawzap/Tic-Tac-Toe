const SET_NEW_VALUE = "SET_NEW_VALUE";
const WHO_WON = "WHO_WON";
const SET_WINNER = "SET_WINNER";
const SWITCH_IS_END = "SWITCH_IS_END";
const SET_START_VALUE = "SET_START_VALUE";
const SET_WINNER_LINE = "SET_WINNER_LINE";
const SET_AI_MOVE = "SET_AI_MOVE";
const SET_IS_DRAW = "SET_IS_DRAW";

let initialState = {
    fields: {
        1: null,
        2: null,
        3: null,

        4: null,
        5: null,
        6: null,

        7: null,
        8: null,
        9: null,
    },
    wichLineWon: {
        topH: false,
        centerH: false,
        bottomH: false,
        leftV: false,
        centerV: false,
        rightV: false,
        leftRR: false,
        rightRR: false,
    },
    ai: {
        isMyMove: false,
    },
    freeFields: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    fieldsArr: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    shouldAIMove: true,
    wichFieldChanged: "",
    isDraw: true,
    winner: null,
    isEnd: false,
};

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

let ticTacToeReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_NEW_VALUE: {
            if (state.shouldAIMove && state.ai.isMyMove) {
                let random = randomInteger(0, state.freeFields.length - 1);
                let newState = {
                    ...state,
                    fields: {
                        ...state.fields,
                        [state.freeFields[random]]: "o",
                    },
                    wichFieldChanged: state.freeFields[random],
                    freeFields: state.freeFields.filter((f) => {
                        if (f !== state.freeFields[random]) {
                            return true;
                        }
                    }),
                };
                return newState;
            }
            let newState = {
                ...state,
                fields: {
                    ...state.fields,
                },
                freeFields: state.freeFields.filter((f) => {
                    if (f !== action.field) {
                        return true;
                    }
                }),
            };

            newState.fields[`${action.field}`] =
                action.player === 1 ? "x" : "o";
            return newState;
        }

        case SET_WINNER:
            return {
                ...state,
                winner: action.winner,
            };

        case SWITCH_IS_END:
            return {
                ...state,
                isEnd: !state.isEnd,
            };

        case SET_WINNER_LINE: {
            let newState = {
                ...state,
                wichLineWon: {
                    ...state.wichLineWon,
                },
                shouldAIMove: false,
            };
            newState.wichLineWon[`${action.line}`] = true;
            return newState;
        }

        case SET_AI_MOVE: {
            return {
                ...state,
                ai: {
                    ...state.ai,
                    isMyMove: action.move,
                },
            };
        }

        case SET_IS_DRAW: {
            return {
                ...state,
                isDraw: false,
            };
        }

        case SET_START_VALUE: {
            return {
                ...state,
                fields: {
                    1: null,
                    2: null,
                    3: null,

                    4: null,
                    5: null,
                    6: null,

                    7: null,
                    8: null,
                    9: null,
                },
                wichLineWon: {
                    topH: false,
                    centerH: false,
                    bottomH: false,
                    leftV: false,
                    centerV: false,
                    rightV: false,
                    leftRR: false,
                    rightRR: false,
                },
                freeFields: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                fieldsArr: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                shouldAIMove: true,
                wichFieldChanged: "",
                isDraw: true,
            };
        }

        default: {
            return state;
        }
    }
};

export let setNewValue = (player, field) => {
    return { type: SET_NEW_VALUE, field, player };
};

export let whoWon = () => {
    return { type: WHO_WON };
};

export let setWinner = (winner) => {
    return { type: SET_WINNER, winner };
};

export let setAIMove = (move) => {
    return { type: SET_AI_MOVE, move };
};

export let switchIsEnd = () => {
    return { type: SWITCH_IS_END };
};

export let setStartValue = () => {
    return { type: SET_START_VALUE };
};

export let setWinnerLine = (line) => {
    return { type: SET_WINNER_LINE, line };
};

export let setIsDraw = () => {
    return { type: SET_IS_DRAW };
};

let checkDraw = (isDraw, dispatch) => {
    if (!isDraw) {
        setTimeout(() => {
            dispatch(setWinner("Draw"));
            dispatch(switchIsEnd());
        }, 400);
    }
};

export let setAIMoveThunk = () => {
    return (dispatch) => {
        dispatch(setAIMove(true));
        setTimeout(() => {
            dispatch(setNewValue(0));
            setTimeout(() => {
                dispatch(setAIMove(false));
            }, 700);
        }, 1000);
    };
};
const setWin = (dispatch, winnerLine, player) => {
    setTimeout(() => {
        dispatch(setWinnerLine(winnerLine));
    }, 500);

    setTimeout(() => {
        dispatch(setWinner(player));
        dispatch(switchIsEnd());
    }, 1500);
};
let checkWinnerLine = (
    field,
    player1,
    player2,
    lines,
    dispatch,
    winnerLine,
    freeFields
) => {
    if (
        field[lines[0]] === player1 &&
        field[lines[1]] === player1 &&
        field[lines[2]] === player1
    ) {
        setWin(dispatch, winnerLine, player1);

        return;
    } else if (
        field[lines[0]] === player2 &&
        field[lines[1]] === player2 &&
        field[lines[2]] === player2
    ) {
        setWin(dispatch, winnerLine, player2);

        return;
    } else if (freeFields.length === 0) {
        dispatch(setIsDraw());
        return;
    }
};

export let checkWinner = (field, player1, player2, freeFields, isDraw) => {
    return (dispatch) => {
        checkWinnerLine(
            field,
            player1,
            player2,
            [1, 2, 3],
            dispatch,
            "topH",
            freeFields
        );
        checkWinnerLine(
            field,
            player1,
            player2,
            [4, 5, 6],
            dispatch,
            "centerH",
            freeFields
        );
        checkWinnerLine(
            field,
            player1,
            player2,
            [7, 8, 9],
            dispatch,
            "bottomH",
            freeFields
        );

        checkWinnerLine(
            field,
            player1,
            player2,
            [1, 5, 9],
            dispatch,
            "leftRR",
            freeFields
        );
        checkWinnerLine(
            field,
            player1,
            player2,
            [3, 5, 7],
            dispatch,
            "rightRR",
            freeFields
        );

        checkWinnerLine(
            field,
            player1,
            player2,
            [1, 4, 7],
            dispatch,
            "leftV",
            freeFields
        );
        checkWinnerLine(
            field,
            player1,
            player2,
            [2, 5, 8],
            dispatch,
            "centerV",
            freeFields
        );
        checkWinnerLine(
            field,
            player1,
            player2,
            [3, 6, 9],
            dispatch,
            "rightV",
            freeFields
        );

        checkDraw(isDraw, dispatch);
    };
};

export default ticTacToeReducer;
