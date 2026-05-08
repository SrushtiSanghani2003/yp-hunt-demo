import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react"; // or your own icon

const ScrollToTopButton = (props: any) => {
  const {
    scrollTarget = null, // ref to a scroll container (optional)
    threshold, // when to show (optional)
    position = { bottom: "1.5rem", right: "1.5rem" }, 
  } = props;

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const target = scrollTarget?.current || window;
    const showThreshold = threshold ?? window.innerHeight; 
    const toggleVisibility = () => {
      const scrollTop = scrollTarget?.current
        ? scrollTarget.current.scrollTop
        : window.scrollY;

      setIsVisible(scrollTop > showThreshold);
    };

    target.addEventListener("scroll", toggleVisibility);
    return () => target.removeEventListener("scroll", toggleVisibility);
  }, [scrollTarget, threshold]);

  const scrollToTop = () => {
    if (scrollTarget?.current) {
      scrollTarget.current.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={scrollToTop}
      style={{ bottom: position.bottom, right: position.right }}
      className={`fixed z-50 p-3 rounded-full shadow-lg transition-opacity bg-primary text-white hover:bg-primary-dark ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-label="Scroll to top"
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
};

export default ScrollToTopButton;
