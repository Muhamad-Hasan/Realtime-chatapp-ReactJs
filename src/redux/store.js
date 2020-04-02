import {createStore, applyMiddleware, compose , combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {
    userReducer
} from './reducer';
export const rootReducer = combineReducers({
    userReducer
})
// const persistedConfig = {
//   key: 'root',
//   storage: AsyncStorage,
// };

//const persistedReducer = persistReducer(persistedConfig, rootReducer);
const middleware = applyMiddleware(thunk);
const store = createStore(rootReducer, middleware);
//const persistor = persistStore(store);
export {store};
