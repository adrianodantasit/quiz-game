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

  tick = () => {
    let seconds = this.state.secondsRemaining - 1;

    this.setState({ secondsRemaining: seconds });

    if (seconds === 0 || this.props.chosen) {
      clearInterval(this.timer);
      this.props.handleTimeLimit(this.props.chosen);
      this.setState({ secondsRemaining: this.state.seconds });
      this.startCountDown();
    }
  };

  startCountDown = () => {
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
