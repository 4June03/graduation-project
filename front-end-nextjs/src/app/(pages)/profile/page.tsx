import { getCurrentUser } from "./_lib/service";
import { ProfileClient } from "./_components/profile-client";
import { cookies } from "next/headers";
import { parseToken } from "@/utils/jwt";

export default async function ProfilePage() {
  try {
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
    console.log("User data phía server", userData);
    return <ProfileClient initialUserData={userData} />;
  } catch (error) {
    console.error("Error loading profile:", error);

    // Return error state or redirect to login
    return (
      <div className="container py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Có lỗi xảy ra
          </h1>
          <p className="text-muted-foreground">
            Không thể tải thông tin tài khoản. Vui lòng thử lại sau.
          </p>
        </div>
      </div>
    );
  }
}
