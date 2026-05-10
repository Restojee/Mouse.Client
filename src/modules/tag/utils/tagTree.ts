import { Tag } from "@/api/codegen/genMouseMapsApi";

export const sortTagsByName = (tags: Tag[]) => [...tags].sort((a, b) => (a.name ?? "").localeCompare(b.name ?? ""));

export const normalizeTagTree = (tags: Tag[]): Tag[] =>
  sortTagsByName(tags).map((tag) => ({
    ...tag,
    childs: tag.childs?.length ? normalizeTagTree(tag.childs) : [],
  }));

export const flattenTags = (tags: Tag[]): Tag[] =>
  tags.flatMap((tag) => {
    const childs = tag.childs ?? [];
    return childs.length ? [tag, ...flattenTags(childs)] : [tag];
  });

export const hasChildTags = (tag: Tag) => Boolean(tag.childs?.length);
