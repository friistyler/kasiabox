import './App.css';
import React from 'react';
import ApnCreator from './ApnCreator';
import kasia from "./kasialogo.png"

class App extends React.Component {

  render() {
    
    return (
      <div className="App">
          <img src={kasia} alt="logo" className="App-logo" />
          <div>
            Kasia's SIM creator!
          </div>
          <ApnCreator
            start={1}
            antal={1}
            apn={"onomondo"}
            paddingchr={"0"}
            antaltegn={10}
          />

      </div>
    );
  }
}

export default App;
