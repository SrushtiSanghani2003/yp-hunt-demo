import { Element } from "@craftjs/core";
import { CraftContainer } from "../components/CraftContainer";
import { CraftFAQ } from "../components/CraftFAQ";
import { CraftText } from "../components/CraftText";

/**
 * Default canvas layout for FAQ block.
 */
export const faqBlockPresetContent = (
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
      text="Frequently Asked Questions"
      tagName="h2"
      fontSize={24}
      fontWeight="700"
      color="#1f2937"
      textAlign="center"
    />
    <CraftFAQ
      items={JSON.stringify([
        { question: "What is your return policy?", answer: "We offer a 30-day money-back guarantee on all purchases." },
        { question: "How do I contact support?", answer: "You can reach our support team via email at support@example.com." },
        { question: "Do you offer free shipping?", answer: "Yes, we offer free shipping on orders over $50." },
      ])}
      padding={16}
      borderRadius={8}
      gap={8}
    />
  </Element>
);
