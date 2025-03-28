package backend.mapper;

import backend.dto.request.AddCategoryRequest;
import backend.dto.request.UpdateCategoryRequest;
import backend.dto.response.CategoryResponse;
import backend.entity.Category;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-03-25T17:41:56+0700",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 17.0.1 (Oracle Corporation)"
)
@Component
public class CategoryMapperImpl implements CategoryMapper {

    @Override
    public Category addCategoryRequestToCategory(AddCategoryRequest request) {
        if ( request == null ) {
            return null;
        }

        Category.CategoryBuilder category = Category.builder();

        category.categoryName( request.getCategoryName() );
        category.description( request.getDescription() );

        return category.build();
    }

    @Override
    public CategoryResponse categoryToCategoryResponse(Category category) {
        if ( category == null ) {
            return null;
        }

        CategoryResponse categoryResponse = new CategoryResponse();

        categoryResponse.setCategoryName( category.getCategoryName() );
        categoryResponse.setDescription( category.getDescription() );

        return categoryResponse;
    }

    @Override
    public void updateCategoryFromDto(UpdateCategoryRequest categoryUpdateDTO, Category category) {
        if ( categoryUpdateDTO == null ) {
            return;
        }

        category.setCategoryName( categoryUpdateDTO.getCategoryName() );
        category.setDescription( categoryUpdateDTO.getDescription() );
    }
}
