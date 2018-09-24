import React, { Component } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Component/Routes";
class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
