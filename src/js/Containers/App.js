import React, { Component } from "react";
import { render } from "react-dom";
import "../../sass/main.scss";
import Question from "../Components/Question";
import Results from "../Components/Results";
import Loading from "../Components/Loading";
import Options from "../Components/Options";

class App extends Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      min_questions: 1,
      max_questions: 20,
      current: 0,
      correct: 0,
      incorrect: 0,
      amount: 1,
      difficulty: "easy"
    };
  }

  componentDidMount() {}

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

  handleField = (value, field) => {
    if (field === "input-amount") this.setState({ amount: value });
    else if (field === "input-difficulty") this.setState({ difficulty: value });
  };

  handleReset = () => {
    this.setState({
      current: 0,
      correct: 0,
      incorrect: 0,
      questions: [],
      amount: 1,
      difficulty: "easy"
    });
  };

  handleStart = () => {
    let url =
      "https://opentdb.com/api.php?amount=%amount%&difficulty=%difficulty%&type=multiple";
    if (this.state.difficulty !== "any") {
      url = url.replace("%difficulty%", this.state.difficulty);
    } else {
      url = url.replace("%difficulty%", "");
    }
    url = url.replace("%amount%", parseInt(this.state.amount));
    if (
      this.state.amount >= this.state.min_questions &&
      this.state.amount <= this.state.max_questions
    ) {
      this.fetchQuestions(url);
    }
  };

  render() {
    const { questions, current, correct, incorrect, amount } = this.state;

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
        {questions.length === 0 && (
          <div className="options">
            <Options
              handleField={this.handleField}
              amount_of_questions={amount}
            />
            <button className="button" onClick={this.handleStart}>
              Start
            </button>
          </div>
        )}
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
