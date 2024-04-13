import { connect } from "react-redux";
import End from "./anotherComponents/End/End";
import Fields from "./anotherComponents/Fields/Fields";
import s from "./App.module.css";
import { setStartValue, switchIsEnd } from "./BLL/tictactoe-reducer";
import { CSSTransition } from "react-transition-group";

function App({ winner, isEnd, setStartValue, switchIsEnd }) {
    return (
        <div className="wrapper">
            <div className={s.app}>
                <h1>Tic-Tac-Toe</h1>
                <Fields />
            </div>
            <CSSTransition
                in={isEnd}
                classNames={{
                    enter: s["end-enter"],
                    enterActive: s["end-enter-active"],
                    exit: s["end-exit"],
                    exitActive: s["end-exit-active"],
                    enterDone: s["end-done-enter"],
                }}
                timeout={1000}
                unmountOnExit
            >
                <div className={s.end}>
                    <End
                        winner={winner}
                        setStartValue={setStartValue}
                        switchIsEnd={switchIsEnd}
                    />
                </div>
            </CSSTransition>
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
