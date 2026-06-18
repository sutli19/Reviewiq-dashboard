export const platforms = [
  {
    id: "amazon",
    name: "Amazon",
    color: "#FF9900",
    totalReviews: 1842,
    avgRating: 4.1,
    avgSentiment: 0.62,
  },
  {
    id: "flipkart",
    name: "Flipkart",
    color: "#2874F0",
    totalReviews: 1290,
    avgRating: 3.8,
    avgSentiment: 0.48,
  },
  {
    id: "website",
    name: "Website",
    color: "#22D3EE",
    totalReviews: 654,
    avgRating: 4.4,
    avgSentiment: 0.71,
  },
  {
    id: "instagram",
    name: "Instagram",
    color: "#E1306C",
    totalReviews: 388,
    avgRating: 4.0,
    avgSentiment: 0.55,
  },
  {
    id: "google",
    name: "Google",
    color: "#34D399",
    totalReviews: 512,
    avgRating: 4.2,
    avgSentiment: 0.6,
  },
];

export const getPlatformById = (id) => platforms.find((p) => p.id === id);