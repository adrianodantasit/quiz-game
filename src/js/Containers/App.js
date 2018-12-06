import React, { Component } from "react";
import { render } from "react-dom";
import "../../sass/main.scss";
import Question from "../Components/Question";
import Results from "../Components/Results";
import Loading from "../Components/Loading";

class App extends Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      current: 0,
      correct: 0,
      incorrect: 0
    };
  }

  componentDidMount() {
    this.fetchQuestions(
      "https://opentdb.com/api.php?amount=2&difficulty=easy&type=multiple"
    );
  }

  fetchQuestions = url => {
    fetch(url)
      .then(response => response.json())
      .then(data =>
        this.setState({
          questions: data.results
        })
      );
  };

  handleAnswer = (current, answer) => {
    if (this.state.questions[current].correct_answer === answer) {
      this.setState({ correct: this.state.correct + 1 });
    } else if (
      this.state.questions[current].incorrect_answers.includes(answer)
    ) {
      this.setState({ incorrect: this.state.incorrect + 1 });
    }
    this.setState({ current: current + 1 });
  };

  handleReset = () => {
    this.setState({ current: 0, correct: 0, incorrect: 0, questions: [] });
    this.fetchQuestions(
      "https://opentdb.com/api.php?amount=2&difficulty=easy&type=multiple"
    );
  };

  render() {
    const { questions, current, correct, incorrect } = this.state;

    /*
      Inside the Brackets:
      1 - Rendering the questions (question has data and current question smaller than questions arr length)
      2 - Rendering the results (question has data and current question equal to questions arr length)
      3 - Loading Spinner while has no data
    */

    return (
      <div className="interface">
        {questions.length > 0 && current < questions.length && (
          <Question
            questions={questions}
            current={current}
            handleAnswer={this.handleAnswer}
          />
        )}
        {questions.length > 0 && current === questions.length && (
          <Results
            correct={correct}
            incorrect={incorrect}
            handleReset={this.handleReset}
          />
        )}
        {questions.length === 0 && <Loading />}
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
