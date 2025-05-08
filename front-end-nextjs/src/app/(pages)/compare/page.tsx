"use client";

import { useState, useEffect } from "react";
import { Breadcrumb } from "@/components/client/layout/breadcrumb";
import { CompareSelector } from "@/components/client/compare/compare-selector";
import { CompareTable } from "@/components/client/compare/compare-table";
import { EmptyCompare } from "@/components/client/compare/empty-compare";

// Mock data for motorcycles
const motorcycles = [
  {
    id: 1,
    name: "Honda SH 150i",
    brand: "Honda",
    category: "Xe tay ga",
    price: 102900000,
    image: "/placeholder.svg?height=300&width=400",
    engine: "150cc, 4 kỳ, SOHC, làm mát bằng dung dịch",
    power: "12.4 kW/8,500 vòng/phút",
    torque: "14.2 Nm/6,500 vòng/phút",
    fuelCapacity: "7.8 lít",
    fuelConsumption: "2.0 lít/100km",
    weight: "134 kg",
    dimensions: "2,090 x 739 x 1,129 mm",
    seatHeight: "799 mm",
    groundClearance: "146 mm",
    frontBrake: "Đĩa, ABS",
    rearBrake: "Đĩa, ABS",
    frontSuspension: "Ống lồng, giảm chấn thủy lực",
    rearSuspension: "Lò xo trụ, giảm chấn thủy lực",
    frontTire: "100/80-16M/C",
    rearTire: "120/80-16M/C",
    features: [
      "Hệ thống khóa thông minh Smart Key",
      "Hệ thống phanh ABS 2 kênh",
      "Hệ thống phun xăng điện tử PGM-FI",
      "Đèn LED toàn bộ",
      "Cổng sạc USB",
      "Hệ thống ngắt động cơ tạm thời Idling Stop",
      "Hệ thống chống trộm",
      "Mặt đồng hồ LCD kỹ thuật số",
    ],
  },
  {
    id: 2,
    name: "Yamaha Exciter 155",
    brand: "Yamaha",
    category: "Xe côn tay",
    price: 50900000,
    image: "/placeholder.svg?height=300&width=400",
    engine: "155cc, 4 kỳ, SOHC, làm mát bằng dung dịch",
    power: "14.2 kW/10,000 vòng/phút",
    torque: "14.7 Nm/8,000 vòng/phút",
    fuelCapacity: "5.4 lít",
    fuelConsumption: "2.2 lít/100km",
    weight: "121 kg",
    dimensions: "1,975 x 665 x 1,085 mm",
    seatHeight: "795 mm",
    groundClearance: "155 mm",
    frontBrake: "Đĩa",
    rearBrake: "Đĩa",
    frontSuspension: "Ống lồng, giảm chấn thủy lực",
    rearSuspension: "Lò xo trụ, giảm chấn thủy lực",
    frontTire: "90/80-17M/C",
    rearTire: "120/70-17M/C",
    features: [
      "Hệ thống khóa thông minh Smart Key",
      "Hệ thống phun xăng điện tử",
      "Đèn LED toàn bộ",
      "Màn hình LCD kỹ thuật số",
      "Công nghệ van biến thiên VVA",
      "Hệ thống chống trộm",
    ],
  },
  {
    id: 3,
    name: "Honda Wave Alpha",
    brand: "Honda",
    category: "Xe số",
    price: 17800000,
    image: "/placeholder.svg?height=300&width=400",
    engine: "110cc, 4 kỳ, SOHC, làm mát bằng không khí",
    power: "6.12 kW/7,500 vòng/phút",
    torque: "8.44 Nm/5,500 vòng/phút",
    fuelCapacity: "3.7 lít",
    fuelConsumption: "1.9 lít/100km",
    weight: "97 kg",
    dimensions: "1,914 x 688 x 1,075 mm",
    seatHeight: "769 mm",
    groundClearance: "135 mm",
    frontBrake: "Đĩa/Tang trống",
    rearBrake: "Tang trống",
    frontSuspension: "Ống lồng, giảm chấn thủy lực",
    rearSuspension: "Lò xo trụ, giảm chấn thủy lực",
    frontTire: "70/90-17M/C",
    rearTire: "80/90-17M/C",
    features: [
      "Hệ thống phun xăng điện tử PGM-FI",
      "Đèn pha LED",
      "Động cơ tiết kiệm nhiên liệu",
      "Hộc đựng đồ phía trước",
    ],
  },
  {
    id: 4,
    name: "Suzuki Raider R150",
    brand: "Suzuki",
    category: "Xe côn tay",
    price: 49990000,
    image: "/placeholder.svg?height=300&width=400",
    engine: "150cc, 4 kỳ, DOHC, làm mát bằng dung dịch",
    power: "13.6 kW/9,500 vòng/phút",
    torque: "13.8 Nm/8,500 vòng/phút",
    fuelCapacity: "4.0 lít",
    fuelConsumption: "2.3 lít/100km",
    weight: "109 kg",
    dimensions: "1,960 x 675 x 980 mm",
    seatHeight: "765 mm",
    groundClearance: "150 mm",
    frontBrake: "Đĩa",
    rearBrake: "Đĩa",
    frontSuspension: "Ống lồng, giảm chấn thủy lực",
    rearSuspension: "Lò xo trụ, giảm chấn thủy lực",
    frontTire: "70/90-17M/C",
    rearTire: "80/90-17M/C",
    features: [
      "Hệ thống phun xăng điện tử",
      "Đèn LED toàn bộ",
      "Màn hình LCD kỹ thuật số",
      "Phanh đĩa trước và sau",
      "Động cơ DOHC 4 van",
    ],
  },
  {
    id: 5,
    name: "Yamaha Grande",
    brand: "Yamaha",
    category: "Xe tay ga",
    price: 45500000,
    image: "/placeholder.svg?height=300&width=400",
    engine: "125cc, 4 kỳ, SOHC, làm mát bằng không khí",
    power: "6.1 kW/6,500 vòng/phút",
    torque: "9.6 Nm/5,000 vòng/phút",
    fuelCapacity: "4.4 lít",
    fuelConsumption: "1.8 lít/100km",
    weight: "101 kg",
    dimensions: "1,820 x 685 x 1,150 mm",
    seatHeight: "790 mm",
    groundClearance: "125 mm",
    frontBrake: "Đĩa",
    rearBrake: "Tang trống",
    frontSuspension: "Ống lồng, giảm chấn thủy lực",
    rearSuspension: "Lò xo trụ, giảm chấn thủy lực",
    frontTire: "90/80-14M/C",
    rearTire: "100/70-14M/C",
    features: [
      "Hệ thống khóa thông minh Smart Key",
      "Hệ thống Stop & Start System",
      "Đèn LED toàn bộ",
      "Cổng sạc USB",
      "Màn hình LCD kỹ thuật số",
      "Hệ thống chống bó cứng phanh ABS",
    ],
  },
  {
    id: 6,
    name: "Honda Vision",
    brand: "Honda",
    category: "Xe tay ga",
    price: 30800000,
    image: "/placeholder.svg?height=300&width=400",
    engine: "110cc, 4 kỳ, SOHC, làm mát bằng không khí",
    power: "6.59 kW/7,500 vòng/phút",
    torque: "9.29 Nm/6,000 vòng/phút",
    fuelCapacity: "4.9 lít",
    fuelConsumption: "1.88 lít/100km",
    weight: "96 kg",
    dimensions: "1,871 x 686 x 1,101 mm",
    seatHeight: "785 mm",
    groundClearance: "120 mm",
    frontBrake: "Đĩa",
    rearBrake: "Tang trống",
    frontSuspension: "Ống lồng, giảm chấn thủy lực",
    rearSuspension: "Lò xo trụ, giảm chấn thủy lực",
    frontTire: "80/90-16M/C",
    rearTire: "90/90-14M/C",
    features: [
      "Hệ thống khóa thông minh Smart Key",
      "Hệ thống phun xăng điện tử PGM-FI",
      "Hệ thống ngắt động cơ tạm thời Idling Stop",
      "Đèn LED toàn bộ",
      "Cốp xe rộng rãi",
    ],
  },
];

// Format price to VND
function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);
}

// Empty motorcycle slot
const emptyMotorcycle = {
  id: 0,
  name: "",
  brand: "",
  category: "",
  price: 0,
  image: "/placeholder.svg?height=300&width=400",
};

export default function ComparePage() {
  const [selectedMotorcycles, setSelectedMotorcycles] = useState<number[]>([
    1, 2, 0,
  ]);
  const [comparedMotorcycles, setComparedMotorcycles] = useState<any[]>([]);

  // Initialize with 2 motorcycles selected
  useEffect(() => {
    updateComparedMotorcycles();
  }, [selectedMotorcycles]);

  // Update the compared motorcycles based on selection
  const updateComparedMotorcycles = () => {
    const compared = selectedMotorcycles.map((id) => {
      if (id === 0) return emptyMotorcycle;
      return motorcycles.find((m) => m.id === id) || emptyMotorcycle;
    });
    setComparedMotorcycles(compared);
  };

  // Handle motorcycle selection
  const handleSelectMotorcycle = (index: number, motorcycleId: number) => {
    const newSelected = [...selectedMotorcycles];
    newSelected[index] = Number(motorcycleId);
    setSelectedMotorcycles(newSelected);
  };

  // Remove a motorcycle from comparison
  const handleRemoveMotorcycle = (index: number) => {
    const newSelected = [...selectedMotorcycles];
    newSelected[index] = 0;
    setSelectedMotorcycles(newSelected);
  };

  // Add an empty slot
  const handleAddMotorcycle = () => {
    if (selectedMotorcycles.length < 3) {
      setSelectedMotorcycles([...selectedMotorcycles, 0]);
    }
  };

  // Check if we can add more motorcycles
  const canAddMore = selectedMotorcycles.length < 3;

  // Check if we have at least 2 motorcycles selected
  const hasMinimumSelected =
    selectedMotorcycles.filter((id) => id !== 0).length >= 2;

  // Get available motorcycles (not already selected)
  const getAvailableMotorcycles = (currentIndex: number) => {
    const currentId = selectedMotorcycles[currentIndex];
    return [
      { id: 0, name: "Chọn xe" },
      ...motorcycles.filter(
        (m) => m.id === currentId || !selectedMotorcycles.includes(m.id)
      ),
    ];
  };

  // Compare values and return appropriate styling
  const compareValues = (values: any[], higherIsBetter = true) => {
    const validValues = values.filter(
      (v) => v !== undefined && v !== null && v !== ""
    );
    if (validValues.length < 2) return Array(values.length).fill("");

    const bestIndex: number[] = [];
    const worstIndex: number[] = [];

    if (typeof validValues[0] === "number") {
      // For numeric values
      const max = Math.max(...(validValues as number[]));
      const min = Math.min(...(validValues as number[]));

      values.forEach((value, index) => {
        if (value === (higherIsBetter ? max : min)) {
          bestIndex.push(index);
        }
        if (value === (higherIsBetter ? min : max)) {
          worstIndex.push(index);
        }
      });
    } else {
      // For string values (like "Đĩa" vs "Tang trống")
      // This is simplified - in a real app you'd have a more sophisticated comparison
      const valueRanking: { [key: string]: number } = {
        "Đĩa, ABS": 3,
        Đĩa: 2,
        "Tang trống": 1,
      };

      const valueScores = values.map((v) => valueRanking[v as string] || 0);
      const max = Math.max(...valueScores);
      const min = Math.min(...valueScores.filter((s) => s > 0));

      values.forEach((value, index) => {
        const score = valueRanking[value as string] || 0;
        if (score === (higherIsBetter ? max : min) && score > 0) {
          bestIndex.push(index);
        }
        if (score === (higherIsBetter ? min : max) && score > 0) {
          worstIndex.push(index);
        }
      });
    }

    return values.map((_, index) => {
      if (bestIndex.includes(index)) return "text-green-600 font-medium";
      if (worstIndex.includes(index)) return "text-red-600";
      return "";
    });
  };

  // Compare features
  const compareFeatures = (motorcycles: any[]) => {
    const allFeatures = new Set<string>();
    motorcycles.forEach((m) => {
      if (m.features) {
        m.features.forEach((f: string) => allFeatures.add(f));
      }
    });

    return Array.from(allFeatures).map((feature) => {
      const hasFeature = motorcycles.map(
        (m) => m.features && m.features.includes(feature)
      );
      return {
        feature,
        hasFeature,
      };
    });
  };

  return (
    <main className="flex min-h-screen flex-col">
      <div className="bg-muted/30 py-6">
        <div className="container">
          <h1 className="text-3xl font-bold mb-2">So sánh xe máy</h1>
          <Breadcrumb
            items={[
              { label: "Trang chủ", href: "/" },
              { label: "So sánh", href: "/compare" },
            ]}
          />
        </div>
      </div>

      <div className="container py-8">
        {/* Motorcycle Selection */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Chọn xe để so sánh</h2>
          <CompareSelector
            selectedMotorcycles={selectedMotorcycles}
            setSelectedMotorcycles={setSelectedMotorcycles}
            motorcycles={motorcycles}
          />
        </div>

        {/* Comparison Table */}
        {hasMinimumSelected ? (
          <CompareTable
            comparedMotorcycles={comparedMotorcycles}
            compareValues={compareValues}
            compareFeatures={compareFeatures}
            formatPrice={formatPrice}
          />
        ) : (
          <EmptyCompare />
        )}
      </div>
    </main>
  );
}
