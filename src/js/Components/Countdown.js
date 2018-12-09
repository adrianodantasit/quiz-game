import React, { Component } from "react";

class Countdown extends Component {
  constructor(props) {
    super(props);
    this.state = { seconds: 10, secondsRemaining: "" };
    this.timer = 0;
  }

  componentDidMount() {
    this.setState({ secondsRemaining: this.state.seconds });
    this.startCountDown();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick = () => {
    let seconds = this.state.secondsRemaining - 1;

    if (seconds < 10) {
      this.setState({ secondsRemaining: "0" + seconds });
    }

    if (seconds === 0 || this.props.chosen) {
      clearInterval(this.timer);
      this.props.handleTimeLimit(this.props.chosen);
      this.startCountDown();
    }
  };

  startCountDown = () => {
    this.setState({ secondsRemaining: this.state.seconds });
    this.timer = setInterval(this.tick, 1000);
  };

  render() {
    return (
      <p className="countdown">
        {this.state.secondsRemaining > 0 ? this.state.secondsRemaining : ""}
      </p>
    );
  }
}

export default Countdown;
