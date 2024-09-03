import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router";
import ErrorMessage from "./ErrorMessage";

const Home = ({
  name,
  setName,
  fetchQuestions,
  score,
  setScore,
  questions,
  setQuestions,
}) => {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const getData = async () => {
    const data = await fetch("https://opentdb.com/api_category.php");
    const json = await data.json();
    setData(json?.trivia_categories);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleClick = () => {
    if (!name || !category || !difficulty) {
      setError(true);
    } else {
      setError(false);
      fetchQuestions(category, difficulty);
      navigate("/quiz");
    }
  };

  if (questions && score) {
    setScore(0);
    setQuestions();
  }

  if (!data.length) return;
  // console.log(data);

  return (
    <div className="w-full">
      <Header />
      <div className="w-[100%] sm:pt-10 flex flex-col-reverse mt-5 justify-center items-center md:flex-row md:justify-around md:h-full md:items-start ">
        <div className="setting w-[100%] md:w-[45%]">
          <h1 className="text-4xl font-semibold pt-5 text-center">
            Quiz Settings
          </h1>
          <div className="settings px-10 sm:px-0 flex flex-col gap-5 sm:gap-3 md:pt-5 ">
            {error && <ErrorMessage />}
            <input
              type="text"
              name="Full Name"
              placeholder="Enter Your Name"
              className="w-full border-2 border-[#21F10D] text-xl text-black outline-none mt-5 py-4 md:py-3 md:text-xl pl-3 rounded-sm font-semibold"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />

            <select
              name="category"
              className=" w-full border-2 border-[#21F10D] text-xl text-black  mt-5 rounded-sm py-4 md:py-3 md:text-xl pl-3 font-semibold outline-none"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option value="" disabled defaultValue={"choose Subject"}>
                Choose Subject
              </option>
              {data.map((cate) => (
                <option key={cate.id} className="active py-2.5" value={cate.id}>
                  {cate.name}
                </option>
              ))}
            </select>

            <select
              name="Select Difficulty"
              className=" w-full border-2 border-[#21F10D] text-xl text-black  mt-5 rounded-sm py-4 md:py-3 md:text-xl pl-3 font-semibold outline-none"
              onChange={(e) => setDifficulty(e.target.value)}
              value={difficulty}
            >
              <option value="" disabled defaultValue={" Select Difficulty"}>
                Select Difficulty
              </option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            <button
              className="w-full  bg-black text-xl text-[#21F10D] mt-5 py-4 md:py-3 md:text-xl rounded-sm font-semibold"
              onClick={handleClick}
            >
              Start Quiz
            </button>
          </div>
        </div>
        <img
          className=" w-[80%] pt-4 sm:w-[60%] md:w-[40%]"
          src="/quiz.svg"
          alt="svg"
        />
      </div>
    </div>
  );
};

export default Home;
