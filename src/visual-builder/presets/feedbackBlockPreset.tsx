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
      quotes={JSON.stringify([
        {
          quote_img_url: "",
          author: "Jane Doe",
          job_title: "CEO, Company Inc.",
          rating: 5,
          quote_text: "This product has completely transformed our workflow. Highly recommended!",
          order: 1,
        },
      ])}
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
