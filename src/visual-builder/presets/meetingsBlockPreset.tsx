import { Element } from "@craftjs/core";
import { CraftContainer } from "../components/CraftContainer";
import { CraftMeetings } from "../components/CraftMeetings";
import { CraftText } from "../components/CraftText";

/**
 * Default canvas layout for Meetings block.
 */
export const meetingsBlockPresetContent = (
  <Element
    is={CraftContainer}
    canvas
    flexDirection="column"
    gap={16}
    padding={20}
    minHeight="200px"
    width="100%"
  >
    <CraftText
      text="Upcoming Events"
      tagName="h3"
      fontSize={20}
      fontWeight="600"
      color="#1f2937"
    />
    <CraftMeetings
      meetings={JSON.stringify([
        { title: "Team Standup", date: "2025-01-15", time: "9:00 AM", location: "Conference Room A" },
        { title: "Product Review", date: "2025-01-20", time: "2:00 PM", location: "Virtual" },
        { title: "Board Meeting", date: "2025-02-01", time: "10:00 AM", location: "Main Office" },
      ])}
      layout="list"
      padding={16}
      borderRadius={8}
      gap={8}
    />
  </Element>
);
