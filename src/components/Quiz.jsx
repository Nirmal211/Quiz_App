import { useEffect, useState } from "react";
import Header from "./Header";
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
  }, [questions, currQuestion]);

  return (
    <div className="w-full">
      <Header />
      <div className="w-full h-full flex flex-col justify-center items-center  ">
        <span className="subTitle border-black border-2 py-4 px-6 my-5 text-2xl ">
          Welcome {name}
        </span>
      </div>

      {questions ? (
        <>
          <div className="w-full px-10 flex justify-between items-center text-xl mt-5 sm:flex-row">
            <span className="uppercase ">
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
