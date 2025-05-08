"use client";
import { ProfileLayout } from "@/components/client/profile/profile-layout";
import { PersonalInfoForm } from "@/components/client/profile/personal-info-form";

// Dummy data for favorite products
const favoriteProducts = [
  {
    id: 1,
    name: "Honda SH 150i",
    brand: "Honda",
    price: 102900000,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Honda Wave Alpha",
    brand: "Honda",
    price: 17800000,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Yamaha Exciter 155 VVA",
    brand: "Yamaha",
    price: 47000000,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "Suzuki Raider R150",
    brand: "Suzuki",
    price: 50990000,
    image: "/placeholder.svg?height=100&width=100",
  },
];

export default function ProfilePage() {
  return (
    <ProfileLayout title="Tài khoản của tôi" activeTab="personal-info">
      <PersonalInfoForm />
    </ProfileLayout>
  );
}
