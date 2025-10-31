export function unsplashOpt(url, w = 640, q = 70) {
  try {
    const u = new URL(url);
    if (
      u.hostname.includes("unsplash.com") ||
      u.hostname.includes("images.unsplash.com")
    ) {
      u.searchParams.set("auto", "format");
      u.searchParams.set("fit", "crop");
      u.searchParams.set("w", String(w));  
      u.searchParams.set("q", String(q));  
      return u.toString();
    }
  } catch {
    
  }
  return url;
}
