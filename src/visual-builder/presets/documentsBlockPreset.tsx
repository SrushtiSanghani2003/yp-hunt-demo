import { Element } from "@craftjs/core";
import { CraftContainer } from "../components/CraftContainer";
import { CraftDocuments } from "../components/CraftDocuments";
import { CraftText } from "../components/CraftText";

/**
 * Default canvas layout for Documents block.
 */
export const documentsBlockPresetContent = (
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
      text="Downloads"
      tagName="h3"
      fontSize={20}
      fontWeight="600"
      color="#1f2937"
    />
    <CraftDocuments
      documents={JSON.stringify([
        { title: "Annual Report 2024", url: "#", type: "pdf", size: "2.4 MB" },
        { title: "Product Brochure", url: "#", type: "pdf", size: "1.1 MB" },
        { title: "Price List", url: "#", type: "xlsx", size: "340 KB" },
      ])}
      padding={16}
      borderRadius={8}
      gap={8}
    />
  </Element>
);
