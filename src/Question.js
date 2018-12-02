import React from "react";

const Question = ({ questions, current, handleClick }) => {
  return (
    <div className="question__container" key={current}>
      <p> {questions[current].question}</p>
      <p> {questions[current].correct_answer}</p>
      <p> {questions[current].incorrect_answers[0]}</p>
      <p> {questions[current].incorrect_answers[1]}</p>
      <p> {questions[current].incorrect_answers[2]}</p>
      <button onClick={() => handleClick(current)}>Next</button>
    </div>
  );
};

export default Question;
