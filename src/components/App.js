import React, { Component } from "react";

class App extends Component {
  state = {
    clicked: false
  };
  onClick = e => {
    this.setState({ clicked: !this.state.clicked });
  };

  render() {
    return (
      <div>
        <img
          src={require("../../public/logo.jpg")}
          alt="logo"
          style={{ width: "200px", height: "100px" }}
        />
        <button className="button" onClick={this.onClick}>
          My React App
        </button>
        {this.state.clicked && <h2 className="text">Clicked!</h2>}
      </div>
    );
  }
}

export default App;
