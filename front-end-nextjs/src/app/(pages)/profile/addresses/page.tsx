"use client";

import { ProfileLayout } from "@/components/client/profile/profile-layout";
import { AddressList } from "@/components/client/profile/address-list";

// Mock data for addresses
const initialAddresses = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    phone: "0912345678",
    address: "123 Đường Lê Lợi, Phường Bến Nghé",
    district: "Quận 1",
    city: "TP. Hồ Chí Minh",
    isDefault: true,
  },
  {
    id: 2,
    name: "Nguyễn Văn A",
    phone: "0912345678",
    address: "456 Đường Nguyễn Huệ, Phường Bến Nghé",
    district: "Quận 1",
    city: "TP. Hồ Chí Minh",
    isDefault: false,
  },
  {
    id: 3,
    name: "Nguyễn Văn A",
    phone: "0912345678",
    address: "789 Đường Lê Văn Việt, Phường Hiệp Phú",
    district: "Quận 9",
    city: "TP. Hồ Chí Minh",
    isDefault: false,
  },
];

export default function AddressesPage() {
  return (
    <ProfileLayout title="Địa chỉ của tôi" activeTab="addresses">
      <AddressList initialAddresses={initialAddresses} />
    </ProfileLayout>
  );
}
