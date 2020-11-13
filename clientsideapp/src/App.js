import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

class App extends Component {
  state = {
    values: []
  };

  componentDidMount() {
    axios.get("http://localhost:5000/api/values").then((response) => {
      this.setState({
        values: response.data
      });
    });
  }

  render() {
    return (
      <div className="App">
        <ul>
          {this.state.values.map((value, index) => {
            return <li key={index}>{value.surname}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default App;
