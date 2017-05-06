import React, { Component } from 'react';
import logo from './logo.svg';

class App extends Component {
  render(){
    return (
      <div>
        <div className="pokeapp">
          <img src={logo} className="App-logo" alt="logo" />
            <h1> Complete I-VI gen. PokeDex! (Including Mega)</h1>
        </div>
      </div>
    )
  }
}

export default App;
