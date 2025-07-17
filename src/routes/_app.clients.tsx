import { ClientTable } from "@/components/client-table";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/clients")({
  component: RouteComponent,
});

const data = [
  {
    id: 0,
    name: "Tiago Rodrigues",
    email: "tiago@mail.com",
    phone_number: "123456",
    birthday: new Date("2001-12-29"),
  },
];

function RouteComponent() {
  return <ClientTable data={data} />;
}
