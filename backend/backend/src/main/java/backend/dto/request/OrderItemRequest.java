package backend.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderItemRequest {
    @NotNull(message = "ID sản phẩm là bắt buộc")
    private Integer cartItemId; // hoặc motorbikeId nếu không dùng cartItem

    @NotNull(message = "ID xe (motorbike) là bắt buộc")
    private Integer motorbikeId;

    @NotNull(message = "ID biến thể (variant) là bắt buộc")
    private Integer variantId;

    @NotNull(message = "ID màu biến thể (variantColor) là bắt buộc")
    private Integer variantColorId;

    @NotNull(message = "Giá sản phẩm tại thời điểm đặt là bắt buộc")
    private Double variantPrice;
}
