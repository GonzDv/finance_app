import { CATEGORY_ICONS } from '../constants/icons';

const CategoryIcon = ({ iconName, color, size = 20 }) => {
  const IconComponent = CATEGORY_ICONS[iconName];

  if (!IconComponent) return null;

  return <IconComponent color={color} size={size} />;
};

export default CategoryIcon;