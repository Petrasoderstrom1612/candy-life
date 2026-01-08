export const formatHTML = (html?: string): string => {
    if (!html) return "";
    return new DOMParser()
      .parseFromString(html, "text/html")
      .body.innerText;
  }