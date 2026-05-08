import { Element } from "@craftjs/core";
import { CraftContainer } from "../components/CraftContainer";
import { CraftTestimonial } from "../components/CraftTestimonial";

/**
 * Default canvas layout for Feedback / Testimonial block.
 */
export const feedbackBlockPresetContent = (
  <Element
    is={CraftContainer}
    canvas
    flexDirection="column"
    gap={16}
    padding={20}
    minHeight="200px"
    width="100%"
  >
    <CraftTestimonial
      quote="This product has completely transformed our workflow. Highly recommended!"
      authorName="Jane Doe"
      authorTitle="CEO, Company Inc."
      authorImage=""
      rating={5}
      layout="card"
      backgroundColor="#ffffff"
      textColor="#333333"
      padding={24}
      borderRadius={12}
      borderWidth={1}
      borderColor="#e5e7eb"
    />
  </Element>
);
