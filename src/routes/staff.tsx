import { createFileRoute } from "@tanstack/react-router";
import { StaffPortal } from "@/components/StaffPortal";

export const Route = createFileRoute("/staff")({
  head: () => ({
    meta: [
      { title: "Staff Portal — StadiumFlow AI" },
      {
        name: "description",
        content: "Volunteer and staff coordination portal for stadium operations.",
      },
    ],
  }),
  component: () => <StaffPortal />,
});
