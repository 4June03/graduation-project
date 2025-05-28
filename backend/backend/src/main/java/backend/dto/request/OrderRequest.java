package backend.dto.request;

import backend.enums.DeliveryMethod;
import backend.enums.PaymentMethod;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OrderRequest {
    @NotNull(message = "Phương thức giao hàng là bắt buộc")
    private DeliveryMethod deliveryMethod;
    @NotNull(message = "Phương thức thanh toán là bắt buộc")
    private PaymentMethod paymentMethod;
//    @NotNull(message = "ID địa chỉ giao hàng là bắt buộc khi giao tận nơi")
    private Integer shippingAddressId;
//    @NotNull(message = "ID chi nhánh là bắt buộc khi nhận tại cửa hàng")
//    private Integer branchId;

    @NotNull
    private Double subtotal;

    @NotNull
    private Double shippingFee;

//    @NotEmpty(message = "Đơn hàng phải có ít nhất một sản phẩm")
//    private List<OrderItemRequest> items;
}
