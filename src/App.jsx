// import Footer from "./components/Footer";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const App = () => {
  const [name, setName] = useState("");
  const [questions, setQuestions] = useState();
  const [score, setScore] = useState(0);

  const fetchQuestions = async (category = "", difficulty = "") => {
    const data = await fetch(
      `https://opentdb.com/api.php?amount=10${
        category && `&category=${category}`
      }${difficulty && `&difficulty=${difficulty}`}&type=multiple`
    );
    const json = await data.json();
    setQuestions(json.results);
    // console.log(json.results);
    console.log(questions);
  };

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <Home name={name} setName={setName} fetchQuestions={fetchQuestions} />
      ),
    },
    {
      path: "/quiz",
      element: (
        <Quiz
          name={name}
          questions={questions}
          setQuestions={setQuestions}
          score={score}
          setScore={setScore}
        />
      ),
    },
    {
      path: "/result",
      element: (
        <Result
          name={name}
          score={score}
          setScore={setScore}
          setQuestions={setQuestions}
        />
      ),
    },
  ]);

  return (
    <div>
      <div className="w-full h-screen">
        <RouterProvider router={appRouter} />
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default App;
