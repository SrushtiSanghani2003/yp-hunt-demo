import { Element } from "@craftjs/core";
import { CraftContainer } from "../components/CraftContainer";
import { CraftText } from "../components/CraftText";
import { CraftImage } from "../components/CraftImage";
import { CraftButton } from "../components/CraftButton";

/**
 * Default canvas layout for Hero Media block.
 * Returns raw Craft.js JSX — must be spread directly inside <Frame>, not rendered as a component.
 */
export const heroMediaPresetContent = (
  <Element
    is={CraftContainer}
    canvas
    flexDirection="column"
    gap={0}
    padding={0}
    minHeight="400px"
    width="100%"
  >
    {/* Hero Image area */}
    <CraftImage
      src=""
      alt="Hero Image"
      width="100%"
      height="300px"
      objectFit="cover"
      borderRadius={0}
    />

    {/* Content overlay area */}
    <Element
      is={CraftContainer}
      canvas
      flexDirection="column"
      gap={12}
      padding={24}
      backgroundColor="#ffffff"
    >
      <CraftText
        text="Hero Title"
        tagName="h1"
        fontSize={32}
        fontWeight="700"
        color="#333333"
        textAlign="left"
      />

      <CraftText
        text="Enter a compelling description for this hero section. This text supports full visual editing."
        tagName="p"
        fontSize={16}
        fontWeight="400"
        color="#666666"
        textAlign="left"
        lineHeight="1.6"
      />

      {/* CTA and Sponsor row */}
      <Element
        is={CraftContainer}
        canvas
        flexDirection="row"
        gap={16}
        padding={0}
        justifyContent="space-between"
        alignItems="center"
      >
        <CraftButton
          text="Learn More"
          backgroundColor="#FCD100"
          color="#000000"
          borderRadius={8}
          fontSize={14}
          fontWeight="600"
          padding="10px 24px"
        />

        <CraftImage
          src=""
          alt="Sponsor Logo"
          width="120px"
          height="40px"
          objectFit="contain"
          borderRadius={4}
        />
      </Element>
    </Element>
  </Element>
);
