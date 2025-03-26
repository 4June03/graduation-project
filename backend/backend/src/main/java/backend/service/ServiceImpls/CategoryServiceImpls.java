package backend.service.ServiceImpls;

import backend.dto.request.AddCategoryRequest;
import backend.dto.request.UpdateCategoryRequest;
import backend.dto.response.CategoryResponse;
import backend.entity.Category;
import backend.exception.CategoryNotFoundException;
import backend.mapper.CategoryMapper;
import backend.repository.CategoryRepository;
import backend.service.CategoryService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true)
public class CategoryServiceImpls implements CategoryService {

    private CategoryRepository categoryRepository;
    private CategoryMapper categoryMapper;

    @Override
    public CategoryResponse saveCategory(AddCategoryRequest request) {

        if(categoryRepository.existsByCategoryName(request.getCategoryName())) throw new RuntimeException("Category đã tồn tại");

        Category category = categoryMapper.addCategoryRequestToCategory(request);

        category.setCreatedAt(LocalDate.now());
        Category c = categoryRepository.save(category);
        System.out.println("Category được trả về: "+c);
        return categoryMapper.categoryToCategoryResponse(c);

    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Optional<Category> getCategoryById(Integer id) {
        Optional<Category> category =  categoryRepository.findById(id);

        if(category.isEmpty()){
            throw new RuntimeException("Không tồn tại category với id "+ id);
        }
        return category;
    }

    @Override
    @Transactional
    public CategoryResponse updateCategory(Integer categoryId, UpdateCategoryRequest request) {

        Category categoryUpdate = categoryRepository.findById(categoryId).orElseThrow(()->new CategoryNotFoundException("Không tìm thấy category có id update"+categoryId));

        categoryMapper.updateCategoryFromDto(request, categoryUpdate);

       return categoryMapper.categoryToCategoryResponse( categoryRepository.save(categoryUpdate));


    }

    @Override
    public void deleteCategory(Integer categoryId) {
        Category categoryDelete = categoryRepository.findById(categoryId).orElseThrow(()->new CategoryNotFoundException("Không tìm thấy category với id delete "+categoryId));
        categoryRepository.delete(categoryDelete);
    }
}
