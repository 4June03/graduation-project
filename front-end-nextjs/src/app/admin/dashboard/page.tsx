import { DashboardStats } from "@/app/admin/dashboard/_component/dashboard-stats";
import { parseToken } from "@/utils/jwt";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const revalidate = 0; // Disable revalidation for this page

export default async function DashboardPage() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("accessToken")?.value;
  console.log("Token phía server", token);

  let userId: number | null = null;

  if (token) {
    const payload = parseToken(token);
    userId = payload?.userId ?? null;
    const role = payload?.scope ?? null;

    if (role !== "ADMIN") {
      redirect("/");
    }
  } else {
    redirect("/auth/login");
  }

  return (
    //
    <DashboardStats />
  );
}
