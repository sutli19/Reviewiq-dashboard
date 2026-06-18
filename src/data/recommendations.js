export const recommendations = [
  {
    id: "rec-1",
    relatedTopic: "packaging",
    title: "Reinforce outer packaging for fragile SKUs",
    description:
      "AI detected recurring mentions of crushed boxes and broken seals, mostly on Amazon shipments over 1kg.",
    suggestedAction: "Switch to double-wall corrugate for top 5 SKUs",
    priority: "high",
  },
  {
    id: "rec-2",
    relatedTopic: "delivery",
    title: "Review Flipkart courier partner SLA",
    description:
      "Late delivery complaints cluster around a single courier partner used for tier-2 city pin codes.",
    suggestedAction: "Renegotiate SLA or switch courier for affected zones",
    priority: "high",
  },
  {
    id: "rec-3",
    relatedTopic: "service",
    title: "Add auto-acknowledgement for support queries",
    description:
      "Average first-response time on Google reviews exceeds 48 hours, well above customer expectation.",
    suggestedAction: "Set up an instant acknowledgement reply",
    priority: "medium",
  },
  {
    id: "rec-4",
    relatedTopic: "sizing",
    title: "Update size guide for new apparel collection",
    description:
      "Multiple reviewers note the fit runs one size smaller than the existing chart suggests.",
    suggestedAction: "Republish size chart with updated measurements",
    priority: "medium",
  },
];