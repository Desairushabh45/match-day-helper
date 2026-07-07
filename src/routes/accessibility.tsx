import { createFileRoute } from "@tanstack/react-router";
import { AccessibilityGuide } from "@/components/AccessibilityGuide";

export const Route = createFileRoute("/accessibility")({
  head: () => ({ meta: [{ title: "Accessibility — StadiumFlow AI" }, { name: "description", content: "Wheelchair routes, hearing loops, quiet zones, and medical stations." }] }),
  component: () => <AccessibilityGuide />,
});
