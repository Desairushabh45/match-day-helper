import { createFileRoute } from "@tanstack/react-router";
import { TransportHub } from "@/components/TransportHub";

export const Route = createFileRoute("/transport")({
  head: () => ({ meta: [{ title: "Transportation — StadiumFlow AI" }, { name: "description", content: "Metro, bus, rideshare, and parking info for your matchday." }] }),
  component: () => <TransportHub />,
});
