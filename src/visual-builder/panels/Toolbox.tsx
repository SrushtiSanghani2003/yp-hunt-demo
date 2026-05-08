import { useEditor, Element } from "@craftjs/core";
import {
  Type,
  Image,
  MousePointerClick,
  Video,
  ArrowUpDown,
  Minus,
  LayoutGrid,
  Quote,
  MessageSquareQuote,
  HelpCircle,
  GalleryHorizontalEnd,
  Users,
  Phone,
  Clock,
  Share2,
  Megaphone,
  Tag,
  FileText,
  CalendarDays,
  MonitorPlay,
  Columns,
  Code,
} from "lucide-react";
import { CraftText } from "../components/CraftText";
import { CraftImage } from "../components/CraftImage";
import { CraftButton } from "../components/CraftButton";
import { CraftVideo } from "../components/CraftVideo";
import { CraftContainer } from "../components/CraftContainer";
import { CraftSpacer } from "../components/CraftSpacer";
import { CraftDivider } from "../components/CraftDivider";
import { CraftTestimonial } from "../components/CraftTestimonial";
import { CraftFAQ } from "../components/CraftFAQ";
import { CraftGallery } from "../components/CraftGallery";
import { CraftTeam } from "../components/CraftTeam";
import { CraftContact } from "../components/CraftContact";
import { CraftQuote } from "../components/CraftQuote";
import { CraftTimeline } from "../components/CraftTimeline";
import { CraftSocialWall } from "../components/CraftSocialWall";
import { CraftAdvertisement } from "../components/CraftAdvertisement";
import { CraftPromotion } from "../components/CraftPromotion";
import { CraftTCard } from "../components/CraftTCard";
import { CraftDocuments } from "../components/CraftDocuments";
import { CraftMeetings } from "../components/CraftMeetings";
import { CraftHtml } from "../components/CraftHtml";

interface ToolboxItemConfig {
  name: string;
  icon: React.ReactNode;
  description: string;
  element: React.ReactElement;
  group?: string;
}

const toolboxItems: ToolboxItemConfig[] = [
  // ---- Basic Elements ----
  {
    name: "Container",
    icon: <LayoutGrid size={18} />,
    description: "Flex layout container",
    element: <Element is={CraftContainer} canvas />,
    group: "Basic",
  },
  {
    name: "Text",
    icon: <Type size={18} />,
    description: "Text paragraph or heading",
    element: <CraftText />,
    group: "Basic",
  },
  {
    name: "Image",
    icon: <Image size={18} />,
    description: "Image with URL",
    element: <CraftImage />,
    group: "Basic",
  },
  {
    name: "Button",
    icon: <MousePointerClick size={18} />,
    description: "Clickable button or link",
    element: <CraftButton />,
    group: "Basic",
  },
  {
    name: "Video",
    icon: <Video size={18} />,
    description: "YouTube or native video",
    element: <CraftVideo />,
    group: "Basic",
  },
  {
    name: "Spacer",
    icon: <ArrowUpDown size={18} />,
    description: "Vertical spacing",
    element: <CraftSpacer />,
    group: "Basic",
  },
  {
    name: "Divider",
    icon: <Minus size={18} />,
    description: "Horizontal line divider",
    element: <CraftDivider />,
    group: "Basic",
  },
  {
    name: "HTML",
    icon: <Code size={18} />,
    description: "Custom HTML code block",
    element: <CraftHtml />,
    group: "Basic",
  },

  // ---- Content Blocks ----
  {
    name: "Testimonial",
    icon: <MessageSquareQuote size={18} />,
    description: "Customer testimonial card",
    element: <CraftTestimonial />,
    group: "Content",
  },
  {
    name: "FAQ",
    icon: <HelpCircle size={18} />,
    description: "FAQ accordion",
    element: <CraftFAQ />,
    group: "Content",
  },
  {
    name: "Gallery",
    icon: <GalleryHorizontalEnd size={18} />,
    description: "Image gallery grid",
    element: <CraftGallery />,
    group: "Content",
  },
  {
    name: "Quote",
    icon: <Quote size={18} />,
    description: "Styled blockquote",
    element: <CraftQuote />,
    group: "Content",
  },
  {
    name: "T-Card",
    icon: <Tag size={18} />,
    description: "Feature cards grid",
    element: <CraftTCard />,
    group: "Content",
  },
  {
    name: "Promotion",
    icon: <Megaphone size={18} />,
    description: "Promo banner & CTA",
    element: <CraftPromotion />,
    group: "Content",
  },
  {
    name: "Advertisement",
    icon: <Megaphone size={18} />,
    description: "Ad banner placement",
    element: <CraftAdvertisement />,
    group: "Content",
  },

  // ---- Info Blocks ----
  {
    name: "Team",
    icon: <Users size={18} />,
    description: "Team members grid",
    element: <CraftTeam />,
    group: "Info",
  },
  {
    name: "Contact",
    icon: <Phone size={18} />,
    description: "Contact info block",
    element: <CraftContact />,
    group: "Info",
  },
  {
    name: "Timeline",
    icon: <Clock size={18} />,
    description: "Vertical timeline",
    element: <CraftTimeline />,
    group: "Info",
  },
  {
    name: "Social Wall",
    icon: <Share2 size={18} />,
    description: "Social media links",
    element: <CraftSocialWall />,
    group: "Info",
  },
  {
    name: "Documents",
    icon: <FileText size={18} />,
    description: "Document downloads list",
    element: <CraftDocuments />,
    group: "Info",
  },
  {
    name: "Meetings",
    icon: <CalendarDays size={18} />,
    description: "Meetings & events list",
    element: <CraftMeetings />,
    group: "Info",
  },

  // ---- Pre-built Sections — drag & drop ready ----
  {
    name: "Hero Banner",
    icon: <MonitorPlay size={18} />,
    description: "Hero with image, headline & button",
    element: (
      <Element
        is={CraftContainer}
        canvas
        flexDirection="column"
        justifyContent="flex-end"
        alignItems="flex-start"
        padding={48}
        minHeight="480px"
        width="100%"
        backgroundColor="#1e3a5f"
        backgroundImage=""
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundOverlay="dark"
        overflow="hidden"
        borderRadius={0}
        gap={16}
      >
        <CraftText
          text="Your Headline Goes Here"
          tagName="h1"
          fontSize={42}
          fontWeight="800"
          color="#ffffff"
          textTransform="uppercase"
          lineHeight="1.1"
          width="80%"
          padding={0}
          margin={0}
        />
        <CraftText
          text="Add a short description or tagline for this section. Click to edit."
          tagName="p"
          fontSize={18}
          fontWeight="400"
          color="rgba(255,255,255,0.85)"
          lineHeight="1.5"
          width="60%"
          padding={0}
          margin={0}
        />
        <CraftButton
          text="Learn More"
          backgroundColor="#FCD100"
          color="#1a1a1a"
          fontSize={16}
          fontWeight="700"
          padding="14px 32px"
          borderRadius={6}
        />
      </Element>
    ),
    group: "Sections",
  },
  {
    name: "CTA Banner",
    icon: <Megaphone size={18} />,
    description: "Call-to-action with centered text",
    element: (
      <Element
        is={CraftContainer}
        canvas
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        padding={48}
        minHeight="280px"
        width="100%"
        backgroundColor="#1e3a5f"
        backgroundImage=""
        backgroundOverlay="medium"
        overflow="hidden"
        gap={16}
      >
        <CraftText
          text="Ready to Get Started?"
          tagName="h2"
          fontSize={32}
          fontWeight="700"
          color="#ffffff"
          textAlign="center"
          width="100%"
          padding={0}
          margin={0}
        />
        <CraftText
          text="Join thousands of users who already trust our platform."
          tagName="p"
          fontSize={16}
          fontWeight="400"
          color="rgba(255,255,255,0.8)"
          textAlign="center"
          width="70%"
          padding={0}
          margin={0}
        />
        <CraftButton
          text="Get Started"
          backgroundColor="#FCD100"
          color="#1a1a1a"
          fontSize={16}
          fontWeight="700"
          padding="14px 36px"
          borderRadius={8}
        />
      </Element>
    ),
    group: "Sections",
  },
  {
    name: "Image Left + Text",
    icon: <Columns size={18} />,
    description: "Image on left, text & button on right",
    element: (
      <Element
        is={CraftContainer}
        canvas
        flexDirection="row"
        justifyContent="flex-start"
        alignItems="center"
        gap={32}
        padding={32}
        minHeight="320px"
        width="100%"
        flexWrap="wrap"
        backgroundColor="#ffffff"
      >
        <CraftImage
          src=""
          alt="Section image"
          width="45%"
          height="280px"
          objectFit="cover"
          borderRadius={12}
        />
        <Element
          is={CraftContainer}
          canvas
          flexDirection="column"
          justifyContent="center"
          alignItems="flex-start"
          gap={12}
          padding={0}
          minHeight="60px"
          width="50%"
          borderWidth={0}
        >
          <CraftText
            text="Section Heading"
            tagName="h2"
            fontSize={28}
            fontWeight="700"
            color="#1f2937"
            padding={0}
            margin={0}
          />
          <CraftText
            text="Add your description here. Click any text to edit it directly on the canvas."
            tagName="p"
            fontSize={16}
            fontWeight="400"
            color="#6b7280"
            lineHeight="1.6"
            padding={0}
            margin={0}
          />
          <CraftButton
            text="Read More"
            backgroundColor="#1e3a5f"
            color="#ffffff"
            fontSize={14}
            fontWeight="600"
            padding="10px 24px"
            borderRadius={6}
          />
        </Element>
      </Element>
    ),
    group: "Sections",
  },
  {
    name: "Text Right + Image",
    icon: <Columns size={18} />,
    description: "Text on left, image on right",
    element: (
      <Element
        is={CraftContainer}
        canvas
        flexDirection="row"
        justifyContent="flex-start"
        alignItems="center"
        gap={32}
        padding={32}
        minHeight="320px"
        width="100%"
        flexWrap="wrap"
        backgroundColor="#f9fafb"
      >
        <Element
          is={CraftContainer}
          canvas
          flexDirection="column"
          justifyContent="center"
          alignItems="flex-start"
          gap={12}
          padding={0}
          minHeight="60px"
          width="50%"
          borderWidth={0}
        >
          <CraftText
            text="Another Section Heading"
            tagName="h2"
            fontSize={28}
            fontWeight="700"
            color="#1f2937"
            padding={0}
            margin={0}
          />
          <CraftText
            text="Describe your content here. This layout works great for alternating sections."
            tagName="p"
            fontSize={16}
            fontWeight="400"
            color="#6b7280"
            lineHeight="1.6"
            padding={0}
            margin={0}
          />
          <CraftButton
            text="Discover"
            backgroundColor="#1e3a5f"
            color="#ffffff"
            fontSize={14}
            fontWeight="600"
            padding="10px 24px"
            borderRadius={6}
          />
        </Element>
        <CraftImage
          src=""
          alt="Section image"
          width="45%"
          height="280px"
          objectFit="cover"
          borderRadius={12}
        />
      </Element>
    ),
    group: "Sections",
  },
  {
    name: "Three Features",
    icon: <LayoutGrid size={18} />,
    description: "Three feature cards in a row",
    element: (
      <Element
        is={CraftContainer}
        canvas
        flexDirection="row"
        justifyContent="space-between"
        alignItems="stretch"
        gap={24}
        padding={32}
        minHeight="200px"
        width="100%"
        flexWrap="wrap"
        backgroundColor="#ffffff"
      >
        <Element
          is={CraftContainer}
          canvas
          flexDirection="column"
          alignItems="center"
          gap={8}
          padding={24}
          minHeight="60px"
          width="30%"
          backgroundColor="#f9fafb"
          borderRadius={12}
          borderWidth={1}
          borderColor="#e5e7eb"
        >
          <CraftText
            text="Feature One"
            tagName="h3"
            fontSize={18}
            fontWeight="700"
            color="#1f2937"
            textAlign="center"
            padding={0}
            margin={0}
          />
          <CraftText
            text="A short description of this feature and why it matters."
            tagName="p"
            fontSize={14}
            color="#6b7280"
            textAlign="center"
            lineHeight="1.5"
            padding={0}
            margin={0}
          />
        </Element>
        <Element
          is={CraftContainer}
          canvas
          flexDirection="column"
          alignItems="center"
          gap={8}
          padding={24}
          minHeight="60px"
          width="30%"
          backgroundColor="#f9fafb"
          borderRadius={12}
          borderWidth={1}
          borderColor="#e5e7eb"
        >
          <CraftText
            text="Feature Two"
            tagName="h3"
            fontSize={18}
            fontWeight="700"
            color="#1f2937"
            textAlign="center"
            padding={0}
            margin={0}
          />
          <CraftText
            text="A short description of this feature and why it matters."
            tagName="p"
            fontSize={14}
            color="#6b7280"
            textAlign="center"
            lineHeight="1.5"
            padding={0}
            margin={0}
          />
        </Element>
        <Element
          is={CraftContainer}
          canvas
          flexDirection="column"
          alignItems="center"
          gap={8}
          padding={24}
          minHeight="60px"
          width="30%"
          backgroundColor="#f9fafb"
          borderRadius={12}
          borderWidth={1}
          borderColor="#e5e7eb"
        >
          <CraftText
            text="Feature Three"
            tagName="h3"
            fontSize={18}
            fontWeight="700"
            color="#1f2937"
            textAlign="center"
            padding={0}
            margin={0}
          />
          <CraftText
            text="A short description of this feature and why it matters."
            tagName="p"
            fontSize={14}
            color="#6b7280"
            textAlign="center"
            lineHeight="1.5"
            padding={0}
            margin={0}
          />
        </Element>
      </Element>
    ),
    group: "Sections",
  },
];

function ToolboxItem({ item }: { item: ToolboxItemConfig }) {
  const { connectors } = useEditor();

  return (
    <div
      ref={(ref) => {
        if (ref) connectors.create(ref, item.element);
      }}
      className="flex items-center gap-3 p-2.5 rounded-xl cursor-grab border border-transparent hover:border-primary hover:bg-yellow-50 transition-all duration-150 active:scale-95 select-none"
      title={item.description}
    >
      <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 shrink-0">
        {item.icon}
      </div>
      <div>
        <span className="text-sm font-medium text-gray-800 block leading-tight">
          {item.name}
        </span>
        <span className="text-[11px] text-gray-400 leading-tight">
          {item.description}
        </span>
      </div>
    </div>
  );
}

export function Toolbox() {
  // Group items
  const groups: Record<string, ToolboxItemConfig[]> = {};
  toolboxItems.forEach((item) => {
    const g = item.group || "Other";
    if (!groups[g]) groups[g] = [];
    groups[g].push(item);
  });

  return (
    <div className="p-3">
      {Object.entries(groups).map(([groupName, items]) => (
        <div key={groupName} className="mb-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2 px-1">
            {groupName}
          </h3>
          <div className="flex flex-col gap-1">
            {items.map((item) => (
              <ToolboxItem key={item.name} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Toolbox;
