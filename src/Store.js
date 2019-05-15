import thunk from "redux-thunk";
import planetReducer from "./store/reducers/planet";
import vehicleReducer from "./store/reducers/vehicle";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";

const rootReducer = combineReducers({
  planet: planetReducer,
  vehicle: vehicleReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
