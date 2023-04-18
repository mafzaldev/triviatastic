import React, { useState, useEffect, useContext } from "react";
import { QuizContext } from "../QuizContext";

export default function StartMenu() {
  const [category, setCategory] = useState(9);
  const [difficulty, setDifficulty] = useState("easy");
  const { startQuiz } = useContext(QuizContext);

  useEffect(() => {
    localStorage.clear();
  }, []);
  return (
    <div className="container">
      <h1>TriviaTastic</h1>
      <h3>Test your Skills</h3>
      <select
        value={category}
        onChange={(event) => setCategory(event.target.value)}
        className="form-control dropdown"
      >
        <option value="9">General Knowledge</option>
        <option value="10">Entertainment: Books</option>
        <option value="11">Entertainment: Film</option>
        <option value="12">Entertainment: Music</option>
        <option value="14">Entertainment: Television</option>
        <option value="15">Entertainment: Video Games</option>
        <option value="16">Entertainment: Board Games</option>
        <option value="17">Science &amp; Nature</option>
        <option value="18">Science: Computers</option>
        <option value="21">Sports</option>
        <option value="22">Geography</option>
        <option value="23">History</option>
        <option value="26">Celebrities</option>
        <option value="27">Animals</option>
        <option value="28">Vehicles</option>
        <option value="29">Entertainment: Comics</option>
        <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
        <option value="32">Entertainment: Cartoon &amp; Animations</option>
      </select>
      <select
        value={difficulty}
        onChange={(event) => setDifficulty(event.target.value)}
        className="form-control dropdown"
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <button type="submit" onClick={() => startQuiz(category, difficulty)}>
        Start Quiz
      </button>
      <footer>
        <span className="credit">
          Made with ❤️ by
          <a
            href="https://github.com/mafzaldev"
            target="_blank"
            className="credit"
            rel="noreferrer"
          >
            @mafzaldev
          </a>
        </span>
      </footer>
    </div>
  );
}
