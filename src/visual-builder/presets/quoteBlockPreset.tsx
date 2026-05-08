import { Element } from "@craftjs/core";
import { CraftContainer } from "../components/CraftContainer";
import { CraftQuote } from "../components/CraftQuote";

/**
 * Default canvas layout for Quote block.
 */
export const quoteBlockPresetContent = (
  <Element
    is={CraftContainer}
    canvas
    flexDirection="column"
    gap={16}
    padding={20}
    minHeight="200px"
    width="100%"
  >
    <CraftQuote
      quote="The best way to predict the future is to create it."
      author="Peter Drucker"
      accentStyle="left-bar"
      accentColor="#f59e0b"
      backgroundColor="#fffbeb"
      textColor="#92400e"
      fontSize={20}
      padding={24}
      borderRadius={8}
    />
  </Element>
);
