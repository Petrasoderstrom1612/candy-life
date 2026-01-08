import React from "react";
import { useSearchParams } from "react-router-dom";
import type {TagSlug, TagFiltersProps} from "../services/Types"


const TagFilters: React.FC<TagFiltersProps> = ({ availableTags }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tagParam = searchParams.get("tag") as TagSlug | null;

  const adjustTagParam = (tagName: TagSlug | null) => {
    setSearchParams(prev => {
      if (tagName === null) {
        prev.delete("tag");
      } else {
        prev.set("tag", tagName);
      }
      return prev;
    });
  };

  return (
    <div className="tag-filter-buttons">
      {availableTags.map(tag => (
        <button
          key={tag}
          onClick={() => adjustTagParam(tag)}
          className={`candy-type ${tag} ${tagParam === tag ? "selected" : ""}`}
        >
          {tag.charAt(0).toUpperCase() + tag.slice(1)} 
        </button>
      ))}
      {tagParam && (<button onClick={() => adjustTagParam(null)} className="candy-type clear-filters">Clear filters</button>)}
    </div>
  );
};

export default TagFilters;
