import React, { Component } from 'react'
import ReactDOM from "react-dom";

export default class App extends Component {
  render() {
    return (
      <div>
        CS 307 starting point
      </div>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('app'))