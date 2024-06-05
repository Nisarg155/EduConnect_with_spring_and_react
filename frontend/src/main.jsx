import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from "react-redux";
import store from "./redux/store.jsx";
import {persistStore} from "redux-persist";
import {PersistGate} from "redux-persist/integration/react";
import {DarkThemeToggle, Flowbite, useThemeMode} from "flowbite-react";
const pstore = persistStore(store)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
          <PersistGate persistor={pstore}>
              <Flowbite>
                  <App />
                  <DarkThemeToggle />
              </Flowbite>
          </PersistGate>
      </Provider>
  </React.StrictMode>,
)
