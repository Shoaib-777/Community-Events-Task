import { Badge } from "./ui/Badge";

export const CategoryFilter = ({ 
  categories, 
  selectedCategories, 
  onCategoryChange 
}) => {
  const handleCategoryClick = (category) => {
    const isSelected = selectedCategories.includes(category);
    
    if (isSelected) {
      onCategoryChange(selectedCategories.filter(c => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      Workshop: "border-community-primary text-community-primary hover:bg-community-primary hover:text-white",
      Music: "border-community-secondary text-community-secondary hover:bg-community-secondary hover:text-white", 
      Sports: "border-community-warm text-community-warm hover:bg-community-warm hover:text-foreground",
      Meetup: "border-accent text-accent hover:bg-accent hover:text-accent-foreground",
      Social: "border-accent text-accent hover:bg-accent hover:text-accent-foreground",
      All: "border-primary text-primary hover:bg-primary hover:text-primary-foreground",
      Entertainment: "border-community-primary text-community-primary hover:bg-community-primary hover:text-white",
      Fitness: "border-community-secondary text-community-secondary hover:bg-community-secondary hover:text-white"
    };
    return colors[category] || "border-muted-foreground text-muted-foreground hover:bg-muted hover:text-foreground";
  };

  const getSelectedColor = (category) => {
    const colors = {
      Workshop: "bg-community-primary text-white border-community-primary",
      Music: "bg-community-secondary text-white border-community-secondary", 
      Sports: "bg-community-warm text-foreground border-community-warm",
      Meetup: "bg-accent text-accent-foreground border-accent",
      Social: "bg-accent text-accent-foreground border-accent",
      All: "bg-primary text-primary-foreground border-primary",
      Entertainment: "bg-community-primary text-white border-community-primary",
      Fitness: "bg-community-secondary text-white border-community-secondary", 
    };
    return colors[category] || "bg-muted text-foreground border-muted";
  };

  return (
    <div className="flex flex-wrap gap-2 p-1 animate-slide-up">
      {categories.map((category) => {
        const isSelected = selectedCategories.includes(category);
        
        return (
          <Badge
            key={category}
            variant="outline"
            className={`cursor-pointer px-4 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 ${
              isSelected 
                ? getSelectedColor(category)
                : getCategoryColor(category)
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </Badge>
        );
      })}
    </div>
  );
};
