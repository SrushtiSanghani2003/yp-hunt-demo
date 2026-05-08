import { Element } from "@craftjs/core";
import { CraftContainer } from "../components/CraftContainer";
import { CraftTeam } from "../components/CraftTeam";

/**
 * Default canvas layout for Team block.
 */
export const teamBlockPresetContent = (
  <Element
    is={CraftContainer}
    canvas
    flexDirection="column"
    gap={16}
    padding={20}
    minHeight="300px"
    width="100%"
  >
    <CraftTeam
      members={JSON.stringify([
        { name: "John Doe", role: "CEO", avatar: "", bio: "Leading the team forward." },
        { name: "Jane Smith", role: "CTO", avatar: "", bio: "Building the technology." },
        { name: "Alex Johnson", role: "Designer", avatar: "", bio: "Crafting the experience." },
      ])}
      columns={3}
      tabletColumns={2}
      mobileColumns={1}
      gap={16}
      imageSize={80}
      padding={16}
    />
  </Element>
);
