import React, { Component } from 'react';
import './App.css';
import Search from './Search'
import { BrowserRouter } from 'react-router-dom'

class App extends Component {


  render() {

    return (
      <div className="App">
        <BrowserRouter>
          <Search />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
