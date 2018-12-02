import React from "react";

const Question = ({ questions, current, handleClick }) => {
  return (
    <div className="card" key={current}>
      <div className="card__question">
        <p> {questions[current].question}</p>
      </div>
      <div className="card__answers">
        <p className="card__answers--1">
          a) {questions[current].correct_answer}
        </p>
        <p className="card__answers--2">
          b) {questions[current].incorrect_answers[0]}
        </p>
        <p className="card__answers--3">
          c) {questions[current].incorrect_answers[1]}
        </p>
        <p className="card__answers--4">
          d) {questions[current].incorrect_answers[2]}
        </p>
      </div>
      <button onClick={() => handleClick(current)}>Next</button>
    </div>
  );
};

export default Question;
