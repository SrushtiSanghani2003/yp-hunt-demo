import { Element } from "@craftjs/core";
import { CraftContainer } from "../components/CraftContainer";
import { CraftAdvertisement } from "../components/CraftAdvertisement";

/**
 * Default canvas layout for Advertisement block.
 */
export const advertisementBlockPresetContent = (
  <Element
    is={CraftContainer}
    canvas
    flexDirection="column"
    gap={12}
    padding={20}
    minHeight="200px"
    width="100%"
  >
    <CraftAdvertisement
      imageUrl=""
      linkUrl=""
      altText="Advertisement"
      height="250px"
      showLabel={true}
      borderRadius={8}
    />
  </Element>
);
