import { useEffect, useState } from "react";
import Header from "./Header";
import { CirclesWithBar } from "react-loader-spinner";
import Question from "./Question";
import { useIcon } from "../hooks/useIcon";
import { useNavigate } from "react-router";

const Quiz = ({ name, questions, score, setScore, setQuestions }) => {
  const [options, setOptions] = useState();
  const [currQuestion, setCurrQuestion] = useState(0);
  const navigate = useNavigate();
  // console.log(questions);

  const icon = useIcon();

  const handleShuffle = (optionsss) => {
    return optionsss.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    if (questions && questions[currQuestion]) {
      const options = [
        ...questions[currQuestion].incorrect_answers,
        questions[currQuestion].correct_answer,
      ];
      setOptions(handleShuffle(options));
    }
    const handleRefresh = (event) => {
      event.preventDefault(); // This line is not strictly necessary for modern browsers
      navigate("/"); // Redirect to the home page
    };

    window.addEventListener("beforeunload", handleRefresh);

    return () => {
      window.removeEventListener("beforeunload", handleRefresh);
    };

    // navigate("/");
  }, [questions, currQuestion]);

  return (
    <div className="w-full">
      <Header score={score} setScore={setScore} setQuestions={setQuestions} />
      <div className="w-full h-full flex flex-col justify-center items-center  ">
        <span className="subTitle border-black border-2 py-2 px-3 my-5 text-xl ">
          Welcome {name}
        </span>
      </div>

      {questions ? (
        <>
          <div className="w-full px-10 flex flex-col justify-between items-center sm:flex-row">
            <span className="uppercase">
              {questions[currQuestion]?.category}
            </span>
            <span className="uppercase">{`Score : ${score}`}</span>
          </div>
          <Question
            questions={questions}
            setQuestions={setQuestions}
            options={options}
            setOptions={setOptions}
            score={score}
            setScore={setScore}
            currQuestion={currQuestion}
            setCurrQuestion={setCurrQuestion}
            correct={questions[currQuestion]?.correct_answer}
          />
        </>
      ) : (
        icon
      )}

      {/* {questions ? <>Question</> : <ColorRing />} */}
    </div>
  );
};

export default Quiz;
