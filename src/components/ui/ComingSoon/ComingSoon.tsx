import Lottie from "lottie-react";
import comingSoonAnimation from "../../../assets/animation/coming soon.json";

const ComingSoon = () => {
  return (
    <>
      <div className="h-[70vh] flex items-center justify-center">
        <Lottie animationData={comingSoonAnimation} style={{ width: "70%" }} />
      </div>
    </>
  );
};

export default ComingSoon;
