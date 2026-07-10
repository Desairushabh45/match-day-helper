import { createFileRoute } from "@tanstack/react-router";
import { StadiumMap } from "@/components/StadiumMap";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Stadium Map — StadiumFlow AI" },
      {
        name: "description",
        content: "Interactive stadium map with live crowd levels, facilities, and directions.",
      },
    ],
  }),
  component: () => <StadiumMap />,
});
