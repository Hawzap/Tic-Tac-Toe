import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import ticTacToeReducer from "./tictactoe-reducer";
import thunkMiddleWare from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

let reducers = combineReducers({
    ticTacToe: ticTacToeReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(
    reducers,
    composeEnhancer(applyMiddleware(thunkMiddleWare))
);

export default store;
