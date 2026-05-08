import { Element } from "@craftjs/core";
import { CraftContainer } from "../components/CraftContainer";
import { CraftGallery } from "../components/CraftGallery";

/**
 * Default canvas layout for Gallery block.
 */
export const galleryBlockPresetContent = (
  <Element
    is={CraftContainer}
    canvas
    flexDirection="column"
    gap={16}
    padding={20}
    minHeight="300px"
    width="100%"
  >
    <CraftGallery
      images={JSON.stringify([
        { src: "https://placehold.co/400x300/e2e8f0/64748b?text=Image+1", alt: "Gallery image 1", caption: "Image 1" },
        { src: "https://placehold.co/400x300/e2e8f0/64748b?text=Image+2", alt: "Gallery image 2", caption: "Image 2" },
        { src: "https://placehold.co/400x300/e2e8f0/64748b?text=Image+3", alt: "Gallery image 3", caption: "Image 3" },
      ])}
      columns={3}
      tabletColumns={2}
      mobileColumns={1}
      gap={8}
      imageHeight="200px"
      borderRadius={8}
      showCaptions={true}
    />
  </Element>
);
