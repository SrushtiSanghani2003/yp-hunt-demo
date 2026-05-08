import { Element } from "@craftjs/core";
import { CraftContainer } from "../components/CraftContainer";
import { CraftSection } from "../components/CraftSection";
import { CraftText } from "../components/CraftText";

/**
 * Default canvas layout for Articles block.
 */
export const articlesBlockPresetContent = (
  <Element
    is={CraftContainer}
    canvas
    flexDirection="column"
    gap={16}
    padding={20}
    minHeight="300px"
    width="100%"
  >
    <CraftText
      text="Latest Articles"
      tagName="h2"
      fontSize={24}
      fontWeight="700"
      color="#1f2937"
    />
    <CraftSection
      moduleType="article"
      columns={3}
      gap={16}
      displayStyle="grid"
      limit={6}
      showImage={true}
      showTitle={true}
      showDate={true}
      showAuthor={true}
      showSectionTitle={false}
    />
  </Element>
);
