import Lottie from "lottie-react";
import loadingAnimation from "../../../assets/animation/loading-json.json";

const LoadingScreen = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <Lottie
        animationData={loadingAnimation}
        autoPlay={true}
        style={{ width: "200px" }}
      />
    </div>
  );
};

export default LoadingScreen;
