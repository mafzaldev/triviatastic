import React from "react";
import he from "he";

export default function Question(props) {
  const choices = props.allChoices.map((option) => {
    return (
      <div>
        <input
          type="radio"
          id={String(props.name + option)}
          name={props.name}
          value={option}
        />
        <label
          className="choice"
          htmlFor={String(props.name + option)}
          onClick={() => {
            props.chooseAnswer(props.name, option);
          }}
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
