import { Element } from "@craftjs/core";
import { CraftContainer } from "../components/CraftContainer";
import { CraftText } from "../components/CraftText";
import { CraftImage } from "../components/CraftImage";

/**
 * Default canvas layout for Image block.
 * Returns raw Craft.js JSX — must be spread directly inside <Frame>, not rendered as a component.
 */
export const imageBlockPresetContent = (
  <Element
    is={CraftContainer}
    canvas
    flexDirection="column"
    gap={8}
    padding={0}
    minHeight="250px"
    width="100%"
  >
    <CraftImage
      src=""
      alt="Block Image"
      width="100%"
      height="300px"
      objectFit="cover"
      borderRadius={8}
    />
    <CraftText
      text="Image caption (optional)"
      tagName="p"
      fontSize={13}
      fontWeight="400"
      color="#9ca3af"
      textAlign="center"
      padding={4}
    />
  </Element>
);
