import { Search } from "lucide-react";

const SearchBar = ({searchQuery,onSearchChange,placeholder}) => {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-12 pr-4 py-3 text-lg bg-white/80 backdrop-blur-sm border-2 border-white/20 focus:border-blue-600 outline-none focus:bg-white shadow-soft hover:shadow-medium transition-all duration-200 rounded-2xl text-black w-full"
        />
      </div>
    </div>
  );
};

export default SearchBar;
