import React, { Component } from "react";

class Options extends Component {
  constructor(props) {
    super(props);
  }

  onValueChange = (event, field) => {
    this.props.handleField(event.target.value, field);
  };

  render() {
    return (
      <form>
        <label>Number of Questions:</label>
        <input
          type="number"
          min="1"
          max="20"
          value={this.props.amount_of_questions}
          className="options__input--number"
          onChange={e => this.onValueChange(e, "input-amount")}
        />
        <label>Choose the difficulty</label>
        <select
          className="options__input--select"
          onChange={e => this.onValueChange(e, "input-difficulty")}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
          <option value="any">Any</option>
        </select>
      </form>
    );
  }
}

export default Options;
