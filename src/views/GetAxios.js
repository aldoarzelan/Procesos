import React, { Component, useState } from "react";
import axios from "axios";
import { render } from "node-sass";



class App extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      motivos: []
    }
  }

  debugger;

  componentDidMount() {
    if (count = 0) {
      axios
        .get({
          baseURL: "https://localhost:5001/api/motivo",
          withCredentials: false,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          }
        })
        .then((response) => {
          console.log(response);
          this.setState({ motivos: response.data });
        })
        .catch((error) => {
          console.log(error);
        });
      setCount(1);
    }
  }

  render() {
    return (
      <div className="App">
        <div className="form-group">
          <select name="motivos" className="form-control">
            {this.state.motivos.map(elemento => (
              <option key={elemento.id} value={elemento.id}>{elemento.descripcion}</option>
            ))}
          </select>
        </div>

      </div>
    );
  }
}

export default App;
