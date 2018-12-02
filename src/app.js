import React from "react";
import { render } from "react-dom";
import "../src/sass/main.scss";
import Question from "./Question";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
      current: 0
    };
  }

  componentDidMount = () => {
    this.fetchQuestions(
      "https://opentdb.com/api.php?amount=10&difficulty=hard&type=multiple"
    );
  };

  fetchQuestions = url => {
    fetch(url)
      .then(response => response.json())
      .then(data =>
        this.setState({
          questions: data.results
        })
      );
  };

  handleClick = current => {
    this.setState({ current: current + 1 });
  };

  render() {
    const { questions, current } = this.state;

    if (questions.length > 0 && current < 10) {
      console.log(questions, current);
      return (
        <div>
          <Question
            questions={questions}
            current={current}
            handleClick={this.handleClick}
          />
        </div>
      );
    } else {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    }
  }
}

render(<App />, document.getElementById("root"));
