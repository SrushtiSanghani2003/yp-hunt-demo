import { useNavigate } from "react-router-dom";
import { paths } from "../../config/paths";
import Button from "../ui/button";
import animation404 from "../../assets/animation/tiger.json";
import Lottie from "lottie-react";

const NotFoundRoute = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(paths.home.path, { replace: true });
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center font-semibold">
        <div className="w-48 sm:w-64 md:w-sp517">
          <Lottie animationData={animation404} loop={true} />
        </div>
        <h1 className="text-3xl sm:text-4xl mb-3 text-black">
          <span className="text-[#FCD100]">404</span> - Not Found
        </h1>
        <p className="text-base text-center mb-3">
          Sorry, the page you are looking for does not exist.
        </p>
        <Button
          text="Go to Home"
          onClick={handleClick}
          backgroundColor="transparent"
          className="px-4 py-2 border border-primary text-xl"
        />
      </div>
    </div>
  );
};

export default NotFoundRoute;
