package backend.controller;

import backend.dto.request.AddCategoryRequest;
import backend.dto.request.UpdateCategoryRequest;
import backend.dto.response.ApiResponse;
import backend.dto.response.CategoryResponse;
import backend.entity.Category;
import backend.service.CategoryService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true)
@RequestMapping("/categories")
@CrossOrigin(origins = "http://localhost:3000")
public class CategoryController {
    private CategoryService categoryService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Category>>> getAllCategory(){

        List<Category> categories = categoryService.getAllCategories();

        if(categories.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ApiResponse.error("Lỗi lấy danh sách"));
        }

        return ResponseEntity.status(HttpStatus.OK).body(ApiResponse.<List<Category>>success(categories,"Lấy danh sách thành công"));

    }

    @PostMapping
    public ApiResponse<CategoryResponse> addCategory(@RequestBody AddCategoryRequest request){
        CategoryResponse response = categoryService.saveCategory(request);

        return ApiResponse.success(response, "Thêm danh mục thành công");

    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<CategoryResponse>> updateCategory(@PathVariable("id") Integer categoryId,@RequestBody UpdateCategoryRequest request){
        CategoryResponse response =  categoryService.updateCategory(categoryId, request);


        return ResponseEntity.ok(ApiResponse.success(response, "Update thành công"));
    }


    @DeleteMapping("/{id}")
    public ApiResponse<String> deleteCategory(@PathVariable("id")Integer categoryId){
        categoryService.deleteCategory(categoryId);

        return ApiResponse.success("", "Xóa danh mục thành công");
    }


}
