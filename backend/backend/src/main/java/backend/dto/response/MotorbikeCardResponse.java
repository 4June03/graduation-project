package backend.dto.response;

import backend.entity.Motorbike;
import backend.entity.Variant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MotorbikeCardResponse {

    private Integer bikeId;
    private String bikeName;
    private Double price;
    private List<String> imageUrls;
    private Integer totalStock;
    private String categoryName;
    private String brandName;
    private boolean isNew;
    private Integer brandId;
    private Integer categoryId;
    /**
     * Chuyển từ entity Motorbike sang DTO chỉ chứa thông tin cần thiết cho card
     */
    public static MotorbikeCardResponse fromEntity(Motorbike bike) {
        MotorbikeCardResponse dto = new MotorbikeCardResponse();
        dto.setBikeId(bike.getBikeId());
        dto.setBikeName(bike.getBikeName());
        dto.setCategoryName(bike.getCategory().getCategoryName());
        dto.setBrandName(bike.getBrand().getBrandName());
        dto.setBrandId(bike.getBrand().getBrandId());
        dto.setCategoryId(bike.getCategory().getCategoryId());
        // Tính tổng số lượng tồn kho
        int sumStock = bike.getVariants().stream()
                .mapToInt(Variant::getVariantStock)
                .sum();
        dto.setTotalStock(sumStock);

        // Lấy variant đầu tiên nếu có
        List<Variant> variants = new ArrayList<>(bike.getVariants());
        if (!variants.isEmpty()) {
            Variant first = variants.get(0);
            dto.setPrice(first.getVariantPrice());

            // Lấy danh sách ảnh từ variant màu đầu tiên
            List<String> urls = new ArrayList<>();
            first.getVariantColors().stream()
                    .findFirst()
                    .ifPresent(vColor -> vColor.getImages()
                            .forEach(img -> urls.add(img.getImageUrl())));
            dto.setImageUrls(urls);
        } else {
            dto.setPrice(null);
            dto.setImageUrls(new ArrayList<>());
        }

        return dto;
    }

}
