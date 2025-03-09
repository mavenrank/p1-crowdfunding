import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrochip, faQuestionCircle } from "@fortawesome/free-solid-svg-icons"; // Default fallback icon
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faHeart,
  faLeaf,
  faBook,
  faPaw,
  faHandsHelping,
  faHandHoldingHeart,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons"; // ✅ Import necessary icons
import { faLightbulb, faUser } from "@fortawesome/free-regular-svg-icons";

// ✅ Map category names to FontAwesome icons
const iconMap: { [key: string]: IconProp } = {
  heartbeat: faHeart,
  leaf: faLeaf,
  book: faBook,
  palette: faPaw,
  microchip: faMicrochip,
  lightbulb: faLightbulb,
  handsHelping: faHandsHelping,
  handholdingheart: faHandHoldingHeart,
  graduationcap: faGraduationCap,
  users: faUser
};

interface CategoryIconProps {
  iconName: string;
  active?: boolean;
}

const CategoryIcon: React.FC<CategoryIconProps> = ({ iconName, active }) => {
  console.log("Icon Name:", iconName); // ✅ Debug: Check the icon name
  return (
    <FontAwesomeIcon
      icon={iconMap[iconName] || faQuestionCircle} // ✅ Use default if icon is not found
      className={`text-2xl ${active ? "text-blue-600" : "text-gray-500"}`}
    />
  );
};

export default CategoryIcon;