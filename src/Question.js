import React from "react";

class Question extends React.Component {
  constructor(props) {
    super(props);
  }

  // Convert ASCII codes to chars
  decodeASCII = string => {
    var parser = new DOMParser();
    var dom = parser.parseFromString(
      "<!doctype html><body>" + string,
      "text/html"
    );
    var decodedString = dom.body.textContent;
    return decodedString;
  };

  shuffleAnswers = array => {
    // Using the Fisher–Yates shuffle Algorithm
    let temporary, randomIndex;

    for (let currentIndex = array.length; currentIndex > 0; ) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporary = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporary;
    }

    return array;
  };

  render() {
    const { questions, current, handleAnswer } = this.props;

    let arrayAnswers = [
      questions[current].correct_answer,
      ...questions[current].incorrect_answers //Spread Operator
    ];

    arrayAnswers = this.shuffleAnswers(arrayAnswers);

    return (
      <div className="card" key={current}>
        <div className="card__question">
          <p> {this.decodeASCII(questions[current].question)}</p>
        </div>
        <div className="card__answers">
          {arrayAnswers.map((answer, i) => {
            return (
              <p
                key={answer}
                className={`card__answers--${i}`}
                onClick={e => handleAnswer(current, answer)}
              >
                {i}) {this.decodeASCII(answer)}
              </p>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Question;
