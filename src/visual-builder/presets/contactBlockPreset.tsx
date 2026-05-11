import { Element } from "@craftjs/core";
import { CraftContainer } from "../components/CraftContainer";
import { CraftContact } from "../components/CraftContact";

/**
 * Default canvas layout for Contact block.
 */
export const contactBlockPresetContent = (
  <Element
    is={CraftContainer}
    canvas
    flexDirection="column"
    gap={16}
    padding={20}
    minHeight="200px"
    width="100%"
  >
    <CraftContact
      title="Contact Us"
      description="Get in touch with our team"
      contacts={JSON.stringify([
        {
          title: "General Enquiries",
          description: "",
          phone: [{ value: "+1 (555) 123-4567" }],
          email: [{ value: "info@example.com" }],
          order: 1,
        },
      ])}
      phone="+1 (555) 123-4567"
      email="info@example.com"
      address="123 Main Street, City, Country"
      showMap={false}
      padding={24}
      borderRadius={12}
      backgroundColor="#ffffff"
      borderWidth={1}
      borderColor="#e5e7eb"
    />
  </Element>
);
