import React from "react";

const Results = ({ correct, incorrect, handleReset }) => {
  // Change colors in sass/abstract/variables before change here
  const resultsColor = {
    goodScore: {
      backgroundColor: "#beffae"
    },
    badScore: {
      backgroundColor: "#f58b8b"
    }
  };

  return (
    <div
      className="results"
      style={
        correct >= incorrect ? resultsColor.goodScore : resultsColor.badScore
      }
    >
      <p className="results__main-text">Final result</p>
      <p>Correct Answers: {correct}</p>
      <p>Wrong Answers: {incorrect}</p>
      <button className="button button__reset" onClick={e => handleReset()}>
        Play again!
      </button>
    </div>
  );
};

export default Results;
