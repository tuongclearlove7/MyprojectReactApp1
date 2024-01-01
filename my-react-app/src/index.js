import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import {UserProvider} from "./feature/userContext"
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import rootReducer from './redux/store/reducers/rootReducer'

const reduxStore = createStore(rootReducer);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={reduxStore}>
            <BrowserRouter>
                <UserProvider>
                    <App/>
                </UserProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
