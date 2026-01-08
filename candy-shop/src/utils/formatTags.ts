import type { Tag } from "../services/Types";

export function formatTags(tags?: Tag[]): string {
  if (!tags || tags.length === 0) return "";

  if (tags.length === 1) return tags[0].name;

  if (tags.length === 2)
    return `${tags[0].name} och ${tags[1].name}`;

  return `${tags
    .slice(0, -1)
    .map(tag => tag.name)
    .join(", ")} och ${tags[tags.length - 1].name}`;
}