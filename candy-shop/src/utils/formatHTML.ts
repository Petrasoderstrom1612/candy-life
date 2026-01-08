export const htmlToInnerText = (html?: string): string => {
    if (!html) return "";
    return new DOMParser()
      .parseFromString(html, "text/html")
      .body.innerText;
  }