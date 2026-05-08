import { Element } from "@craftjs/core";
import { CraftContainer } from "../components/CraftContainer";
import { CraftText } from "../components/CraftText";

/**
 * Default canvas layout for Text block.
 * Returns raw Craft.js JSX — must be spread directly inside <Frame>, not rendered as a component.
 */
export const textBlockPresetContent = (
  <Element
    is={CraftContainer}
    canvas
    flexDirection="column"
    gap={12}
    padding={20}
    minHeight="200px"
    width="100%"
  >
    <CraftText
      text="Section Heading"
      tagName="h2"
      fontSize={24}
      fontWeight="700"
      color="#333333"
      textAlign="left"
    />
    <CraftText
      text="Write your content here. You can add multiple text elements, change fonts, sizes, colors, and arrange them freely on the canvas. Double-click any text to edit it inline."
      tagName="p"
      fontSize={16}
      fontWeight="400"
      color="#555555"
      textAlign="left"
      lineHeight="1.7"
    />
  </Element>
);
