import { Element } from "@craftjs/core";
import { CraftContainer } from "../components/CraftContainer";
import { CraftText } from "../components/CraftText";
import { CraftButton } from "../components/CraftButton";

/**
 * Default canvas layout for CTA block.
 * Returns raw Craft.js JSX — must be spread directly inside <Frame>, not rendered as a component.
 */
export const ctaBlockPresetContent = (
  <Element
    is={CraftContainer}
    canvas
    flexDirection="column"
    gap={16}
    padding={32}
    minHeight="200px"
    width="100%"
    backgroundColor="#f9fafb"
    borderRadius={12}
    alignItems="center"
  >
    <CraftText
      text="Ready to Get Started?"
      tagName="h2"
      fontSize={28}
      fontWeight="700"
      color="#333333"
      textAlign="center"
    />
    <CraftText
      text="Take action now with our easy-to-use platform."
      tagName="p"
      fontSize={16}
      fontWeight="400"
      color="#666666"
      textAlign="center"
    />
    <Element
      is={CraftContainer}
      canvas
      flexDirection="row"
      gap={12}
      padding={0}
      justifyContent="center"
      alignItems="center"
    >
      <CraftButton
        text="Get Started"
        backgroundColor="#000000"
        color="#ffffff"
        borderRadius={8}
        fontSize={16}
        fontWeight="600"
        padding="12px 32px"
      />
      <CraftButton
        text="Learn More"
        backgroundColor="transparent"
        color="#333333"
        borderRadius={8}
        fontSize={16}
        fontWeight="500"
        borderWidth={2}
        borderColor="#333333"
        padding="12px 32px"
      />
    </Element>
  </Element>
);
