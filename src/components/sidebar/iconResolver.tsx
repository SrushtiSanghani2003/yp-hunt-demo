import * as FiIcons from "react-icons/fi";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import * as LucideIcons from "lucide-react";

// Merge all icons once
const icons = {
  ...FiIcons,
  ...MdIcons,
  ...FaIcons,
  ...LucideIcons,
};

export const getReactIcon = (iconName: string, size = 20) => {
  const IconComponent = (icons as any)[iconName];

  if (!IconComponent) {
    const Fallback = LucideIcons.HelpCircle;
    return <Fallback size={size} />;
  }

  return <IconComponent size={size} />;
};
