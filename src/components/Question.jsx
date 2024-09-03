import React, { useState } from "react";
import ErrorMessage from "./ErrorMessage";
import { useNavigate } from "react-router";

const Question = ({
  questions,
  currQuestion,
  setQuestions,
  setCurrQuestion,
  score,
  setScore,
  correct,
  options,
  // setOptions,
}) => {
  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (i) => {
    if (selected === i && selected === correct) {
      return "select";
    } else if (selected === i && selected !== correct) {
      return "wrong";
    } else if (i === correct) {
      return "select";
    }
  };

  const handleCheck = (i) => {
    setSelected(i);
    if (i === correct) setScore(score + 1);
    setError(error);
    setError();
  };

  const handleNext = () => {
    if (currQuestion > 8) {
      navigate("/result");
    } else if (selected) {
      setCurrQuestion(currQuestion + 1);
      setSelected();
      setError();
    } else {
      setError("Please Select an Option First");
    }
  };

  const handleQuit = () => {
    navigate("/");
    setScore(0);
    setQuestions();
  };

  return (
    <>
      <div className="w-full h-full px-10">
        <h1 className="text-4xl mt-10 sm:mt-5 font-bold text-center sm:text-3xl">
          {`Question ${currQuestion + 1}`}
        </h1>
        <div>
          <h2 className=" pt-8 text-2xl mb-2 sm:text-2xl sm:mt-2">
            {questions[currQuestion]?.question}
          </h2>
          <div
            id="options"
            className="w-full h-full flex flex-col sm:flex-row sm:flex-wrap sm:justify-between"
          >
            {error && <ErrorMessage />}
            {options &&
              options.map((i) => (
                <button
                  key={i}
                  onClick={() => handleCheck(i)}
                  className={`${
                    selected && handleSelect(i)
                  } border border-black  text-2xl mt-4 sm:mt-8 px-2 py-4 rounded-sm sm:w-[48%] sm:py-4 sm:text-2xl sm:mb-5"`}
                  disabled={selected}
                >
                  {i}
                </button>
              ))}
          </div>
          <div className="w-full h-full flex justify-between mt-2 py-3  sm:text-center sm:mt-0 sm:py-8">
            <button
              onClick={handleQuit}
              className="w-[48%] border border-black py-4 text-2xl mt-5 font-semibold sm:py-3 sm:text-2xl rounded-sm hover:bg-slate-400/30"
            >
              Quit
            </button>
            <button
              onClick={handleNext}
              className="w-[48%] border border-black py-4 text-2xl mt-5 font-semibold sm:py-3 sm:text-2xl rounded-sm hover:bg-slate-400/30"
            >
              {currQuestion === 9 ? "Submit" : "Next Question"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Question;
