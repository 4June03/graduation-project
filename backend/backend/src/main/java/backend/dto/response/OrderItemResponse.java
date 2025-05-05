package backend.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderItemResponse {
    private Integer orderItemId;        // ID của mục đơn hàng
    private Integer motorbikeId;        // ID của xe máy
    private String motorbikeName;       // Tên xe máy
    private Integer variantId;          // ID của biến thể
    private String variantName;         // Tên biến thể
    private Integer variantColorId;     // ID của màu biến thể
    private String colorName;           // Tên màu
    private Integer quantity;           // Số lượng
    private Double price;               // Giá tại thời điểm đặt hàng
}
