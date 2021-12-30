import './App.css';
import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {ConfigureStore} from './redux/ConfigureStore';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Main from './components/MainComponent';


const store =  ConfigureStore();

class App extends Component{
  render(){
    return(
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Main/>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}


export default App;
