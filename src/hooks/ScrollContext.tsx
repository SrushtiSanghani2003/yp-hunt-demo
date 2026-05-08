// src/contexts/ScrollContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface ScrollContextType {
  isScrolled: boolean;
  isHeaderFixed: boolean;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

interface ScrollProviderProps {
  children: ReactNode;
}

export const ScrollProvider: React.FC<ScrollProviderProps> = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isHeaderFixed, setIsHeaderFixed] = useState<boolean>(false);
  const pathname = window?.location.pathname;

  useEffect(() => {
    if (pathname === "/dashboard") {
      setIsHeaderFixed(true);
    }else{
      setIsHeaderFixed(false);
    }
    const handleScroll = () => {
      setIsScrolled(window?.scrollY > 10);
    };

    handleScroll(); // for initial state
    window.addEventListener("scroll", handleScroll);
    return () => window?.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return (
    <ScrollContext.Provider value={{ isScrolled, isHeaderFixed }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = (): ScrollContextType => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("useScroll must be used within a ScrollProvider");
  }
  return context;
};

