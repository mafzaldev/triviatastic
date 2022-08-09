import "./App.css";
import blueBlob from "./Images/blue-blob.png";
import yellowBlob from "./Images/yellow-blob.png";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartMenu from "./Pages/StartMenu";
import QuizScreen from "./Pages/QuizScreen";
import ResultScreen from "./Pages/ResultScreen";
import { QuizContextProvider } from "./QuizContext";

const App = () => {
  return (
    <div className="main">
      <img src={yellowBlob} alt="Yellow Blob" className="yellow-blob" />
      <img src={blueBlob} alt="Blue Blob" className="blue-blob" />
      <BrowserRouter>
        <QuizContextProvider>
          <Routes>
            <Route path="/" element={<StartMenu />}></Route>
            <Route path="/quiz" element={<QuizScreen />}></Route>
            <Route path="/results" element={<ResultScreen />}></Route>
          </Routes>
        </QuizContextProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
