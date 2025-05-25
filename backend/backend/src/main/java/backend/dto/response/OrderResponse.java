package backend.dto.response;

import backend.entity.Address;
import backend.enums.DeliveryMethod;
import backend.enums.OrderStatus;
import backend.enums.PaymentMethod;
import backend.enums.PaymentStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Builder
public class OrderResponse {
    private Integer orderId;
    private Integer userId;
    private UserResponse user;
    private LocalDate orderDate;
    private LocalDate updatedAt;
    private Set<OrderItemResponse> orderItems;
    private Double shippingFee;
    private Double subtotal;
    private Double totalAmount;
    private DeliveryMethod deliveryMethod;
    private PaymentMethod paymentMethod;
    private OrderStatus orderStatus;
    private PaymentStatus paymentStatus;
    private Integer branchId;
    private String branchName;
    private Address shippingAddress;
}
