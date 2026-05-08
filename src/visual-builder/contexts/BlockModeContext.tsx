import { createContext, useContext, useState, useCallback } from "react";

export type BlockEditMode = "form" | "design";

interface BlockModeContextValue {
  mode: BlockEditMode;
  setMode: (mode: BlockEditMode) => void;
  toggleMode: () => void;
}

const BlockModeContext = createContext<BlockModeContextValue>({
  mode: "form",
  setMode: () => {},
  toggleMode: () => {},
});

export function BlockModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<BlockEditMode>("form");

  const toggleMode = useCallback(() => {
    setMode((prev) => (prev === "form" ? "design" : "form"));
  }, []);

  return (
    <BlockModeContext.Provider value={{ mode, setMode, toggleMode }}>
      {children}
    </BlockModeContext.Provider>
  );
}

export function useBlockMode() {
  return useContext(BlockModeContext);
}
