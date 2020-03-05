import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { View } from "react-native";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <View style={{ width: 100, height: 20, backgroundColor: "red" }} />
      </header>
    </div>
  );
}

export default App;
