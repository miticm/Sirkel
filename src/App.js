import React, { Component } from 'react'
import ReactDOM from "react-dom"
require('../node_modules/normalize.css/normalize.css')

export default class App extends Component {
  render() {
    return (
      <div>
        CS 307 project
      </div>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('app'))