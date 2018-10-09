import "./LandingPage.css";

import React, { Component } from "react";

export default class LandingPage extends Component {
  words = [
    "Meet People",
    "Find Clubs",
    "Found Clubs",
    "Go Advanture",
    "Study Together"
  ];
  txt = "";
  wordIndex = 0;
  wait = 1000;
  isDeleting = false;
  type() {
    const currentIndex = this.wordIndex % this.words.length;
    const fulltxt = this.words[currentIndex];
    if (this.isDeleting) {
      //remove a char
      this.txt = fulltxt.substring(0, this.txt.length - 1);
    } else {
      //add a char
      this.txt = fulltxt.substring(0, this.txt.length + 1);
    }
    this.setState({ text: this.txt });

    //speed
    let typeSpeed = 100;
    if (this.isDeleting) {
      typeSpeed /= 4;
    }
    if (this.txt === fulltxt && !this.isDeleting) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = this.wait / 2;
    }
    setTimeout(() => this.type(), typeSpeed);
  }
  componentDidMount() {
    this.type();
  }
  state = {
    text: ""
  };
  render() {
    return (
      <div className="LandingPage">
        <div className="logo" />
        <h1 className="typer">
          <span className="text">{this.state.text}</span>
        </h1>
      </div>
    );
  }
}
