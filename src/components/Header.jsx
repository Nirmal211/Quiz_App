import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className=" w-full flex justify-center items-center text-4xl py-5 border-b-2 ">
      <Link to="/">
        <h1>DavNex Quiz Hub</h1>
      </Link>
    </div>
  );
};

export default Header;
