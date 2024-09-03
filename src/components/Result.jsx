import { useNavigate } from "react-router";
import Header from "./Header";
const Result = ({ name, score, setScore, setQuestions }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
    setScore(0);
    setQuestions();
  };

  return (
    <div className="w-full h-full">
      <Header />
      <p className="pl-6 mt-2 text-sm ">{name}</p>
      <div className="mt-[40vw] sm:mt-[15vw] w-[100%] text-center ">
        <h1 className="text-4xl">Final Score : {score}</h1>
        <button
          className="py-2.5 px-5 rounded-md mt-5 bg-[#21F10D]/90 text-white font-semibold"
          onClick={handleClick}
        >
          Go To HomePage
        </button>
      </div>
    </div>
  );
};

export default Result;
