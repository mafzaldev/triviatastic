import React from "react";
import he from "he";

export default function Answer(props) {
  const choices = props.allChoices.map((option) => {
    return (
      <div>
        <label
          className={
            he.decode(props.correctChoice) === he.decode(props.answerChosen) &&
            he.decode(props.answerChosen) === he.decode(option)
              ? "correct choice"
              : "incorrect choice"
          }
        >
          {he.decode(option)}
        </label>
      </div>
    );
  });

  return (
    <div className="question">
      <h4 className="question-statement">{he.decode(props.statement)}</h4>
      <div className="choices">{choices}</div>
      <hr />
    </div>
  );
}
