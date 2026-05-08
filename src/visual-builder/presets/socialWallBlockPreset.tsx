import { Element } from "@craftjs/core";
import { CraftContainer } from "../components/CraftContainer";
import { CraftSocialWall } from "../components/CraftSocialWall";
import { CraftText } from "../components/CraftText";

/**
 * Default canvas layout for Social Wall block.
 */
export const socialWallBlockPresetContent = (
  <Element
    is={CraftContainer}
    canvas
    flexDirection="column"
    gap={16}
    padding={20}
    minHeight="200px"
    width="100%"
    alignItems="center"
  >
    <CraftText
      text="Follow Us"
      tagName="h3"
      fontSize={20}
      fontWeight="600"
      color="#1f2937"
      textAlign="center"
    />
    <CraftSocialWall
      platforms={JSON.stringify([
        { name: "Facebook", url: "https://facebook.com", icon: "facebook" },
        { name: "Twitter", url: "https://twitter.com", icon: "twitter" },
        { name: "Instagram", url: "https://instagram.com", icon: "instagram" },
        { name: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
      ])}
      layout="row"
      iconSize={44}
      gap={16}
      padding={16}
    />
  </Element>
);
