import { createFileRoute } from "@tanstack/react-router";
import { MatchSchedule } from "@/components/MatchSchedule";

export const Route = createFileRoute("/schedule")({
  head: () => ({ meta: [{ title: "Match Schedule — StadiumFlow AI" }, { name: "description", content: "Today's FIFA World Cup 2026 matches with live countdowns and filters." }] }),
  component: () => <MatchSchedule />,
});
