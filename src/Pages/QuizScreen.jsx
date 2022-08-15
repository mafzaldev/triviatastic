import React from "react";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../QuizContext";
import Question from "../Components/Question";

export default function QuizScreen() {
  let navigate = useNavigate();
  const [roundFinished, setRoundFinished] = useState(false);
  const {
    questions,
    setQuestions,
    chooseAnswer,
    answerError,
    areAllQuestionsAnswered,
  } = useContext(QuizContext);

  useEffect(() => {
    const questions = JSON.parse(localStorage.getItem("questions"));
    if (questions === [] || questions === null) {
      navigate("/");
    } else {
      setQuestions(questions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const questionStatements = questions.map((question) => {
    return (
      <Question
        key={question.index}
        statement={question.statement}
        allChoices={question.allChoices}
        name={question.index}
        chooseAnswer={chooseAnswer}
      />
    );
  });

  return (
    <div className="quiz-container">
      <h1 style={{ marginTop: "-90px" }}>Quizzical</h1>
      {questionStatements}
      {answerError && (
        <span className="error">Please answer all questions</span>
      )}
      <button
        onClick={() => {
          if (!roundFinished && areAllQuestionsAnswered()) {
            setRoundFinished((prev) => !prev);
            localStorage.setItem("questions", JSON.stringify(questions));
            navigate("/results");
          }
        }}
      >
        Submit Quiz
      </button>
    </div>
  );
}
