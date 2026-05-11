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
        { name: "John Doe", designation: "CEO", image_url: "", short_bio: "Leading the team forward.", order: 1 },
        { name: "Jane Smith", designation: "CTO", image_url: "", short_bio: "Building the technology.", order: 2 },
        { name: "Alex Johnson", designation: "Designer", image_url: "", short_bio: "Crafting the experience.", order: 3 },
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
