/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate } from "react-router-dom";
import MotorCategoryCard from "../../components/common/MotorCategoryCard";

const CategoryGrid = () => {
  const navigate = useNavigate();

  const handleChooseCategory = () => {
    navigate("/products");
  };

  return (
    <>
      <h1 className="w-full text-center font-semibold my-20 text-2xl uppercase">
        Danh mục sản phẩm
      </h1>
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <MotorCategoryCard
            image="https://www.honda.com.vn/images/xe-may/category/D_3.png"
            title="Xe tay ga"
            onClick={handleChooseCategory}
          />
          <MotorCategoryCard
            image="https://www.honda.com.vn/images/xe-may/category/D_3.png"
            title="Xe tay ga"
            onClick={handleChooseCategory}
          />
          <MotorCategoryCard
            image="https://www.honda.com.vn/images/xe-may/category/D_3.png"
            title="Xe tay ga"
            onClick={handleChooseCategory}
          />
          <MotorCategoryCard
            image="https://www.honda.com.vn/images/xe-may/category/D_3.png"
            title="Xe tay ga"
            onClick={handleChooseCategory}
          />
          <MotorCategoryCard
            image="https://www.honda.com.vn/images/xe-may/category/D_3.png"
            title="Xe tay ga"
            onClick={handleChooseCategory}
          />
          <MotorCategoryCard title="Xe tay ga" onClick={handleChooseCategory} />
        </div>
      </div>
    </>
  );
};

export default CategoryGrid;
