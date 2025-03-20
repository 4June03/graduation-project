import { Slider } from "antd";
import { FC, useState } from "react";
import { RxDividerHorizontal } from "react-icons/rx";

interface PriceRangeFilterProps {
  minPrice: number;
  maxPrice: number;
}

const PriceRangeFilter: FC<PriceRangeFilterProps> = ({
  minPrice,
  maxPrice,
}) => {
  const [range, setRange] = useState([minPrice, maxPrice]);

  // Cập nhật giá trị khi kéo slider
  const handleSliderChange = (value) => {
    setRange(value);
  };

  const handleMinValueChange = (e) => {
    const value: number = Number(e?.target?.value);

    if (value < range[1]) {
      setRange([value, range[1]]);
    }
  };

  const handleMaxValueChange = (e) => {
    const value: number = Number(e?.target?.value);

    if (value > range[0]) {
      setRange([range[0], value]);
    }
  };

  return (
    <div className="flex flex-col gap-4 my-4">
      <h3 className="text-lg font-semibold">Giá</h3>
      <Slider
        range
        min={0}
        max={1000}
        // tooltip={{ open: true }}
        className="custom-slider"
        value={range}
        onChange={handleSliderChange}
      />

      <div className="flex gap-4 justify-center items-center">
        <input
          onChange={handleMinValueChange}
          placeholder="s"
          type="text"
          name=""
          id=""
          className="border rounded-md border-1 border-gray-500 py-1 px-2 box-border focus-visible:outline-none"
          value={range[0]}
        />
        <RxDividerHorizontal />
        <input
          onChange={handleMaxValueChange}
          placeholder="s"
          type="text"
          name=""
          id=""
          className="border rounded-md border-1 border-gray-500 py-1 px-2 box-border focus-visible:outline-none"
          value={range[1]}
        />
      </div>
    </div>
  );
};

export default PriceRangeFilter;
