/**
 * Rehype plugin that puts an outline icon (Tabler style) in front of selected
 * h2/h3 headings in Markdown content. Icons are matched by the heading's exact
 * text, so adding an icon to a new heading means adding one line to HEADING_ICONS.
 *
 * Styling lives in `src/styles/typography.css` (`.heading-icon`).
 */

// SVG path data per icon (24x24 viewBox, 2px stroke).
const ICON_PATHS = {
  building: [
    "M3 21l18 0",
    "M5 21v-14l8 -4v18",
    "M19 21v-10l-6 -4",
    "M9 9l0 .01",
    "M9 12l0 .01",
    "M9 15l0 .01",
    "M9 18l0 .01",
  ],
  briefcase: [
    "M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z",
    "M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2",
    "M12 12l0 .01",
    "M3 13a20 20 0 0 0 18 0",
  ],
  history: ["M12 8l0 4l2 2", "M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5"],
  world: [
    "M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0",
    "M3.6 9h16.8",
    "M3.6 15h16.8",
    "M11.5 3a17 17 0 0 0 0 18",
    "M12.5 3a17 17 0 0 1 0 18",
  ],
  wallet: [
    "M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12",
    "M20 12v4h-4a2 2 0 0 1 0 -4h4",
  ],
  search: ["M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0", "M21 21l-6 -6"],
  bank: [
    "M3 21l18 0",
    "M3 10l18 0",
    "M5 6l7 -3l7 3",
    "M4 10l0 11",
    "M20 10l0 11",
    "M8 14l0 3",
    "M12 14l0 3",
    "M16 14l0 3",
  ],
  video: [
    "M15 10l4.553 -2.276a1 1 0 0 1 1.447 .894v6.764a1 1 0 0 1 -1.447 .894l-4.553 -2.276v-4z",
    "M3 6m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z",
  ],
  code: ["M7 8l-4 4l4 4", "M17 8l4 4l-4 4", "M14 4l-4 16"],
  certificate: [
    "M15 15m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0",
    "M13 17.5v4.5l2 -1.5l2 1.5v-4.5",
    "M10 19h-5a2 2 0 0 1 -2 -2v-10c0 -1.1 .9 -2 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -1 1.73",
    "M6 9l12 0",
    "M6 12l3 0",
    "M6 15l2 0",
  ],
  users: [
    "M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0",
    "M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2",
    "M16 3.13a4 4 0 0 1 0 7.75",
    "M21 21v-2a4 4 0 0 0 -3 -3.85",
  ],
  school: [
    "M22 9l-10 -4l-10 4l10 4l10 -4v6",
    "M6 10.6v5.4a6 3 0 0 0 12 0v-5.4",
  ],
  award: [
    "M12 9m-6 0a6 6 0 1 0 12 0a6 6 0 1 0 -12 0",
    "M12 15l3.4 5.89l1.598 -3.233l3.598 .232l-3.4 -5.889",
    "M6.802 12l-3.4 5.89l3.598 -.233l1.598 3.232l3.4 -5.889",
  ],
  language: [
    "M4 5h7",
    "M9 3v2c0 4.418 -2.239 8 -5 8",
    "M5 9c-.003 2.144 2.952 3.908 6.7 4",
    "M12 20l4 -9l4 9",
    "M19.1 18h-6.2",
  ],
  mail: [
    "M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z",
    "M3 7l9 6l9 -6",
  ],
};

// Exact heading text -> icon name.
const HEADING_ICONS = {
  // Experience
  "Xebia IT Architects": "building",
  "Trantor Software": "briefcase",
  "Earlier roles": "history",
  // Projects
  "Enterprise web and guest experience platform": "world",
  "Loan and eWallet application": "wallet",
  "Customer search engine for the VMware sales team": "search",
  "Capital market and loan management portal": "bank",
  "Online video conferencing and presentation platform": "video",
  // Skills
  "Technical skills": "code",
  Certifications: "certificate",
  Leadership: "users",
  // About
  Education: "school",
  "Honors and awards": "award",
  Languages: "language",
  "Get in touch": "mail",
};

const textOf = node =>
  node.type === "text"
    ? node.value
    : (node.children ?? []).map(textOf).join("");

const createIcon = name => ({
  type: "element",
  tagName: "svg",
  properties: {
    className: ["heading-icon"],
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    ariaHidden: "true",
  },
  children: ICON_PATHS[name].map(d => ({
    type: "element",
    tagName: "path",
    properties: { d },
    children: [],
  })),
});

export const rehypeHeadingIcons = () => tree => {
  const visit = node => {
    if (!node.children) return;
    for (const child of node.children) {
      if (
        child.type === "element" &&
        (child.tagName === "h2" || child.tagName === "h3")
      ) {
        const icon = HEADING_ICONS[textOf(child).trim()];
        if (icon) child.children.unshift(createIcon(icon));
      } else {
        visit(child);
      }
    }
  };

  visit(tree);
};
