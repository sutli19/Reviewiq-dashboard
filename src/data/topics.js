export const topics = [
  {
    id: "packaging",
    name: "Packaging",
    reviewCount: 412,
    percentage: 18,
    trend: "up",
    sentiment: { positive: 120, neutral: 90, negative: 202 },
  },
  {
    id: "delivery",
    name: "Delivery & Shipping",
    reviewCount: 356,
    percentage: 15,
    trend: "up",
    sentiment: { positive: 140, neutral: 80, negative: 136 },
  },
  {
    id: "quality",
    name: "Product Quality",
    reviewCount: 298,
    percentage: 13,
    trend: "down",
    sentiment: { positive: 210, neutral: 50, negative: 38 },
  },
  {
    id: "pricing",
    name: "Pricing & Value",
    reviewCount: 187,
    percentage: 8,
    trend: "stable",
    sentiment: { positive: 90, neutral: 60, negative: 37 },
  },
  {
    id: "service",
    name: "Customer Service",
    reviewCount: 244,
    percentage: 10,
    trend: "up",
    sentiment: { positive: 95, neutral: 40, negative: 109 },
  },
  {
    id: "sizing",
    name: "Sizing & Fit",
    reviewCount: 165,
    percentage: 7,
    trend: "stable",
    sentiment: { positive: 80, neutral: 45, negative: 40 },
  },
];

export const getTopicById = (id) => topics.find((t) => t.id === id);