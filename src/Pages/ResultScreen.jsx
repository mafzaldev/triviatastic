import React from "react";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../QuizContext";
import Answer from "../Components/Answer";

export default function ResultScreen() {
  let navigate = useNavigate();
  const { questions, setQuestions, resetQuestions, countCorrectAnswers } =
    useContext(QuizContext);

  useEffect(() => {
    if (!localStorage.getItem("questions")) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const questions = JSON.parse(localStorage.getItem("questions"));
    if (questions) {
      setQuestions(questions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const results = questions.map((question) => {
    return (
      <Answer
        key={question.index}
        statement={question.statement}
        allChoices={question.allChoices}
        name={question.index}
        answerChosen={question.answerChosen}
        correctChoice={question.correctChoice}
      />
    );
  });

  return (
    <div className="quiz-container">
      <h1 style={{ marginTop: "-90px" }}>Quizzical</h1>
      {results}
      <span
        className="finished"
        style={{
          marginTop: "10px",
          fontSize: "25px",
          textTransform: "uppercase",
        }}
      >
        You scored{" "}
        <span className="correct" style={{ marginRight: "5px" }}>
          {countCorrectAnswers()}/10
        </span>
        correct answers.
      </span>
      <button
        onClick={() => {
          resetQuestions();
          localStorage.clear();
          navigate("/");
        }}
      >
        Play Again
      </button>
    </div>
  );
}
