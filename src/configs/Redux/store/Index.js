import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { Provider } from 'react-redux';
import { reducer } from '../reducer/Index';


const Store = createStore(reducer, applyMiddleware(thunk));

export default function ReduxProvider(props){
    return (
        <Provider store={ Store }>
            {props.children}
        </Provider>
    )
}