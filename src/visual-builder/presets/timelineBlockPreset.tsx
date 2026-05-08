import { Element } from "@craftjs/core";
import { CraftContainer } from "../components/CraftContainer";
import { CraftTimeline } from "../components/CraftTimeline";
import { CraftText } from "../components/CraftText";

/**
 * Default canvas layout for Timeline block.
 */
export const timelineBlockPresetContent = (
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
      text="Our Journey"
      tagName="h2"
      fontSize={24}
      fontWeight="700"
      color="#1f2937"
    />
    <CraftTimeline
      items={JSON.stringify([
        { title: "Company Founded", date: "2020", description: "Started with a vision to change the industry." },
        { title: "First Product Launch", date: "2021", description: "Released our flagship product to the market." },
        { title: "Reached 10K Users", date: "2022", description: "Milestone achieved with growing community." },
      ])}
      layout="left"
      accentColor="#f59e0b"
      lineColor="#e5e7eb"
      padding={16}
    />
  </Element>
);
