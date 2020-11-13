//import React from "react";
import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { List } from "semantic-ui-react";

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
        <List>
          {this.state.values.map((value: any, index: any) => {
            return (
              <List.Item
                icon="linkify"
                content={
                  <a href="http://www.semantic-ui.com">{value.surname}</a>
                }
              />
            );
          })}
        </List>
      </div>
    );
  }
}

export default App;
