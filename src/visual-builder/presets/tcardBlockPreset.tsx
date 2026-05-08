import { Element } from "@craftjs/core";
import { CraftContainer } from "../components/CraftContainer";
import { CraftTCard } from "../components/CraftTCard";

/**
 * Default canvas layout for T-Card block.
 */
export const tcardBlockPresetContent = (
  <Element
    is={CraftContainer}
    canvas
    flexDirection="column"
    gap={16}
    padding={20}
    minHeight="300px"
    width="100%"
  >
    <CraftTCard
      items={JSON.stringify([
        { title: "Feature One", description: "A powerful feature to help you succeed.", image: "" },
        { title: "Feature Two", description: "Built with performance in mind.", image: "" },
        { title: "Feature Three", description: "Designed for the modern user.", image: "" },
      ])}
      columns={3}
      tabletColumns={2}
      mobileColumns={1}
      gap={16}
      cardBorderRadius={12}
      cardBackgroundColor="#ffffff"
      cardBorderColor="#e5e7eb"
      imageHeight="160px"
    />
  </Element>
);
