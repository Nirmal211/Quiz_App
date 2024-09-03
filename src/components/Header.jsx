import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className=" w-full flex justify-center items-center py-5 border-b-2 ">
      <Link to="/">
        <h1 className="text-5xl font-semibold">DavNex Quiz Hub</h1>
      </Link>
    </div>
  );
};

export default Header;
