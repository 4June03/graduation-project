import { getCurrentUser } from "../_lib/service";
import { AddressesClient } from "./_components/addresses-client";

export default async function AddressesPage() {
  try {
    // Fetch user data on server side
    const userData = await getCurrentUser();

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
