package backend.dto.response;

import backend.enums.DeliveryMethod;
import backend.enums.OrderStatus;
import backend.enums.PaymentMethod;
import backend.enums.PaymentStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Builder
public class OrderListResponse {
    private Integer orderId;
    private Integer userId;
    private LocalDate orderDate;
    private LocalDate updatedAt;
    private Double shippingFee;
    private Double subtotal;
    private DeliveryMethod deliveryMethod;
    private PaymentMethod paymentMethod;
    private OrderStatus orderStatus;
    private PaymentStatus paymentStatus;
}