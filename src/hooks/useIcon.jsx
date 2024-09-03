import { CirclesWithBar } from "react-loader-spinner";

export const useIcon = () => {
  return (
    <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
      <CirclesWithBar />;
    </div>
  );
};
