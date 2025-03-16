import { IoIosSearch } from "react-icons/io";

const SearchBox = () => {
  return (
    <div className="relative h-[40px] flex-1 max-w-96 border border-gray-300 rounded-md">
      <input
        type="text"
        placeholder="tìm kiếm"
        className="w-full h-full bg-[#f0f1f2] px-2 focus-visible:outline-none text-gray-500"
      />
      <button
        title="Search"
        className="h-full absolute top-0 right-0 text-gray-500 pr-4"
      >
        <IoIosSearch />
      </button>
    </div>
  );
};

export default SearchBox;
