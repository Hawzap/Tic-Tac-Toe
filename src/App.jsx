import { connect } from "react-redux";
import End from "./anotherComponents/End/End";
import Fields from "./anotherComponents/Fields/Fields";
import s from "./App.module.css";
import { setStartValue, switchIsEnd } from "./BLL/tictactoe-reducer";
import { useEffect } from "react";

function App(props) {
    useEffect(() => {
        if (props.isEnd) {
            setTimeout(() => {
                document.querySelector(`.${s.end}`).classList.add(s.endActive);
            }, 10);
        }
    }, [props.isEnd]);
    return (
        <div className="wrapper">
            <div className={s.app}>
                <h1>Tic-Tac-Toe</h1>
                <Fields />
            </div>
            {props.isEnd ? (
                <div className={s.end}>
                    <End
                        winner={props.winner}
                        setStartValue={props.setStartValue}
                        isEnd={props.isEnd}
                        switchIsEnd={props.switchIsEnd}
                    />
                </div>
            ) : (
                ""
            )}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        winner: state.ticTacToe.winner,
        isEnd: state.ticTacToe.isEnd,
    };
};

export default connect(mapStateToProps, { setStartValue, switchIsEnd })(App);
