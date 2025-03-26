package backend.service;

import backend.dto.request.AddCategoryRequest;
import backend.dto.request.UpdateCategoryRequest;
import backend.dto.response.CategoryResponse;
import backend.entity.Category;


import java.util.List;
import java.util.Optional;

public interface CategoryService {

    CategoryResponse saveCategory(AddCategoryRequest request);

    List<Category> getAllCategories();

    Optional<Category> getCategoryById(Integer categoryId);


    CategoryResponse updateCategory(Integer categoryId, UpdateCategoryRequest request);


    void deleteCategory(Integer categoryId);
}
