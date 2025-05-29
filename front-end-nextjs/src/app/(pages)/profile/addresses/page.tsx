import { cookies } from "next/headers";
import { getCurrentUser } from "../_lib/service";
import { AddressesClient } from "./_components/addresses-client";
import { parseToken } from "@/utils/jwt";

export default async function AddressesPage() {
  try {
    // Fetch user data on server side
    const cookieStore = cookies();
    const token = (await cookieStore).get("accessToken")?.value;
    console.log("Token phía server", token);

    let userId: number | null = null;

    if (token) {
      const payload = parseToken(token);
      userId = payload?.userId ?? null;
    }
    // Fetch user data on server side
    const userData = await getCurrentUser(userId);

    return <AddressesClient initialAddresses={userData.addresses} />;
  } catch (error) {
    console.error("Error loading addresses:", error);

    return (
      <div className="container py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Có lỗi xảy ra
          </h1>
          <p className="text-muted-foreground">
            Không thể tải danh sách địa chỉ. Vui lòng thử lại sau.
          </p>
        </div>
      </div>
    );
  }
}
