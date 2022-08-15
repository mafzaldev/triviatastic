import React from "react";
import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
export const QuizContext = createContext(null);

export const QuizContextProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [answerError, setAnswerError] = useState(false);
  let navigate = useNavigate();

  const shuffleOptions = (array) => {
    let m = array.length,
      t,
      i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  };

  const startQuiz = async (category, difficulty) => {
    var tempQuestions = [];
    const response = await fetch(
      `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
    );
    const data = await response.json();
    tempQuestions = data.results.map((question) => ({
      statement: question.question,
      correctChoice: question.correct_answer,
      allChoices: shuffleOptions([
        ...question.incorrect_answers,
        question.correct_answer,
      ]),
      index: data.results.indexOf(question),
      answerChosen: "",
    }));

    setQuestions(tempQuestions);

    if (tempQuestions.length !== 0) {
      localStorage.setItem("questions", JSON.stringify(tempQuestions));
    }
    navigate("/quiz");
  };

  const chooseAnswer = (index, answer) => {
    setQuestions((prev) => {
      let newQuestions = [...prev];
      newQuestions[index].answerChosen = answer;
      return newQuestions;
    });
  };

  const countCorrectAnswers = () => {
    let rightAnswerCounter = 0;
    questions.forEach((question) => {
      if (question.correctChoice === question.answerChosen) {
        rightAnswerCounter++;
      }
    });
    return rightAnswerCounter;
  };

  const areAllQuestionsAnswered = () => {
    let answerCounter = 0;
    questions.forEach((question) => {
      if (question.answerChosen !== "") {
        answerCounter++;
      }
    });

    if (answerCounter === 10) {
      setAnswerError(false);
      return true;
    } else {
      setAnswerError(true);
      return false;
    }
  };

  const resetQuestions = () => {
    setQuestions([]);
  };

  const values = {
    questions,
    setQuestions,
    answerError,
    setAnswerError,
    startQuiz,
    chooseAnswer,
    resetQuestions,
    areAllQuestionsAnswered,
    countCorrectAnswers,
    shuffleOptions,
  };
  return <QuizContext.Provider value={values}>{children}</QuizContext.Provider>;
};
