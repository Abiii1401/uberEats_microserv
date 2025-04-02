
import MenuItem, { MenuItemType } from "./MenuItem";

interface MenuSectionProps {
  title: string;
  items: MenuItemType[];
  onAddToCart?: (item: MenuItemType, quantity: number) => void;
}

const MenuSection = ({ title, items, onAddToCart }: MenuSectionProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="grid gap-4">
        {items.map((item) => (
          <MenuItem 
            key={item.id} 
            item={item} 
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuSection;
