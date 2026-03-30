function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getHashId(href: string) {
  return href.startsWith("#") ? href.slice(1) : "";
}

function getHeaderOffset() {
  const header = document.querySelector("header");

  if (!(header instanceof HTMLElement)) {
    return 24;
  }

  return header.getBoundingClientRect().height + 20;
}

export function scrollToHash(href: string) {
  const id = getHashId(href);
  if (!id || typeof window === "undefined") {
    return false;
  }

  const target = document.getElementById(id);
  if (!target) {
    return false;
  }

  const rect = target.getBoundingClientRect();
  const absoluteTop = window.scrollY + rect.top;
  const absoluteBottom = absoluteTop + rect.height;
  const viewportHeight = window.innerHeight;
  const headerOffset = getHeaderOffset();
  const usableViewportHeight = Math.max(viewportHeight - headerOffset - 24, 120);
  const maxScroll = Math.max(document.documentElement.scrollHeight - viewportHeight, 0);

  const desiredTop =
    rect.height <= usableViewportHeight
      ? clamp(absoluteTop - headerOffset - (usableViewportHeight - rect.height) / 2, 0, maxScroll)
      : clamp(Math.min(absoluteTop - headerOffset, absoluteBottom - viewportHeight + 24), 0, maxScroll);

  window.scrollTo({
    top: desiredTop,
    behavior: "smooth",
  });
  window.history.replaceState(null, "", href);

  return true;
}
