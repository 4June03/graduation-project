package backend.mapper;

import backend.dto.request.AddCategoryRequest;
import backend.dto.request.UpdateCategoryRequest;
import backend.dto.response.CategoryResponse;
import backend.entity.Category;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;



@Mapper(componentModel = "spring")
public interface CategoryMapper {

    Category addCategoryRequestToCategory(AddCategoryRequest request);

    CategoryResponse categoryToCategoryResponse(Category category);

    void updateCategoryFromDto(UpdateCategoryRequest categoryUpdateDTO, @MappingTarget Category category);
}
