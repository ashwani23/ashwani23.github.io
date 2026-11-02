import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    // TODO: replace with the final deployed URL (used for canonical links, sitemap and RSS).
    url: "https://ashwani23.github.io/",
    title: "Ashwani Goyal",
    description:
      "Portfolio of Ashwani Goyal, Engineering Manager at Xebia. Full stack, cloud and Generative AI.",
    author: "Ashwani Goyal",
    profile: "https://www.linkedin.com/in/gashwani23/",
    ogImage: "default-og.jpg",
    lang: "en",
    timezone: "Asia/Kolkata",
    dir: "ltr",
  },
  posts: {
    perPage: 4,
    perIndex: 4,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: false,
    showBackButton: true,
    editPost: {
      enabled: false,
    },
    search: "pagefind",
  },
  socials: [
    { name: "github", url: "https://github.com/ashwani23" },
    { name: "linkedin", url: "https://www.linkedin.com/in/gashwani23/" },
    { name: "mail", url: "mailto:ashwani.work@outlook.com" },
  ],
  shareLinks: [
    { name: "whatsapp", url: "https://wa.me/?text=" },
    { name: "x", url: "https://x.com/intent/post?url=" },
    { name: "mail", url: "mailto:?subject=See%20this%20post&body=" },
  ],
});
