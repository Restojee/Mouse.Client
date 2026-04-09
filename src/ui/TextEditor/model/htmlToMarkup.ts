const getNodeText = (node: Node): string => {
  if (node.nodeType === Node.TEXT_NODE) {
    return (node.textContent ?? "").replace(/\u00a0/g, " ");
  }
  if (node.nodeType !== Node.ELEMENT_NODE) return "";

  const el = node as HTMLElement;
  const tag = el.tagName.toLowerCase();

  if (tag === "br") return "\n";

  if (tag === "strong" || tag === "b") {
    const inner = childrenText(el);
    return inner ? `[b]${inner}[/b]` : "";
  }
  if (tag === "em" || tag === "i") {
    const inner = childrenText(el);
    return inner ? `[i]${inner}[/i]` : "";
  }
  if (tag === "u") {
    const inner = childrenText(el);
    return inner ? `[u]${inner}[/u]` : "";
  }
  if (tag === "a") {
    const href = el.getAttribute("href") ?? "";
    const text = childrenText(el);
    return `[url=${href}]${text || href}[/url]`;
  }
  if (el.dataset?.mention || el.getAttribute("data-mention")) {
    const username = el.dataset?.mention ?? el.getAttribute("data-mention") ?? "";
    return `@${username}`;
  }
  if (el.dataset?.spoiler !== undefined || el.getAttribute("data-spoiler") !== null) {
    const inner = childrenText(el);
    return `[spoiler]${inner}[/spoiler]`;
  }

  // div = paragraph break
  if (tag === "div") {
    return childrenText(el) + "\n";
  }

  return childrenText(el);
};

const childrenText = (el: Element): string => Array.from(el.childNodes).map(getNodeText).join("");

export const htmlToMarkup = (html: string): string => {
  if (!html || html === "<br>" || html === "<br/>") return "";

  if (typeof document === "undefined") return "";

  const parser = new DOMParser();
  const doc = parser.parseFromString(`<div>${html}</div>`, "text/html");
  const root = doc.body.firstElementChild!;

  let result = childrenText(root);

  // Trim trailing newline added by last div
  result = result.replace(/\n$/, "");

  return result;
};
