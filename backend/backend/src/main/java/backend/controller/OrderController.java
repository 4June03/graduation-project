package backend.controller;

import backend.dto.request.OrderRequest;
import backend.dto.response.ApiResponse;
import backend.dto.response.OrderItemResponse;
import backend.dto.response.OrderResponse;
import backend.entity.*;
import backend.enums.DeliveryMethod;
import backend.enums.OrderStatus;
import backend.enums.PaymentStatus;
import backend.mapper.UserMapper;
import backend.service.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true)
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {
    private OrderService orderService;
    private UserService userService;
    private CartService cartService;
    private AddressService addressService;
    private UserMapper userMapper;

    @GetMapping
    public ApiResponse<?> getAllOrders(@RequestHeader("Authorization") String authorizationHeader){
        try {
            String token = authorizationHeader.substring(7); // Bỏ "Bearer "
            String email = userService.getUserNameFromJWT(token);
            User user = userService.getUserByEmail(email);
            return ApiResponse.success(user, "Hehe");

        } catch (Exception e) {
            return ApiResponse.error("Lỗi khi xử lý token: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ApiResponse<?> getOrderById(@PathVariable("id") Integer orderId){
        Order order = orderService.getOrderById(orderId);
        OrderResponse response = toOrderResponse(order);
        return ApiResponse.success(response, "Lấy thông tin order thành công");
    }


    @PostMapping
    public ApiResponse<?> addOrder(@RequestHeader("Authorization") String authorizationHeader,@Valid @RequestBody OrderRequest request){
        try {
            String token = authorizationHeader.substring(7); // Bỏ "Bearer "
            String email = userService.getUserNameFromJWT(token);
            User user = userService.getUserByEmail(email);

            Order order = orderService.addOrder(user, request);
            OrderResponse response = toOrderResponse(order);
            return ApiResponse.success(response, "Đặt hàng thành công");
        } catch (Exception e) {
            return ApiResponse.error("Lỗi khi xử lý token: " + e.getMessage());
        }
    }

    public OrderResponse toOrderResponse(Order order) {
        OrderResponse response = OrderResponse.builder()
                .orderId(order.getOrderId())
                .user(userMapper.userToUserResponse(order.getUser()))
                .orderDate(order.getOrderDate())
                .orderStatus(order.getOrderStatus())
                .updatedAt(order.getUpdatedAt())
                .shippingFee(order.getShippingFee())
                .subtotal(order.getSubtotal())
                .totalAmount(order.getTotalAmount())
                .deliveryMethod(order.getDeliveryMethod())
                .paymentMethod(order.getPaymentMethod())
                .paymentStatus(order.getPaymentStatus())
                .build();

        response.setOrderItems(order.getOrderItems().stream()
                .map(this::toOrderItemResponse)
                .collect(Collectors.toSet()));

        if (order.getBranch() != null) {
            response.setBranchId(order.getBranch().getBranchId());
            response.setBranchName(order.getBranch().getBranchName());
        }
        return response;
    }

    private OrderItemResponse toOrderItemResponse(OrderItem item) {
        OrderItemResponse dto = new OrderItemResponse();
        dto.setOrderItemId(item.getOrderItemId());
        dto.setMotorbikeId(item.getMotorbike().getBikeId());
        dto.setMotorbikeName(item.getMotorbike().getBikeName());
        dto.setVariantId(item.getVariant().getVariantId());
        dto.setVariantName(item.getVariant().getVariantName());
        dto.setVariantColorId(item.getVariantColor().getVariantColorId());
        dto.setColorName(item.getVariantColor().getColor().getColorName());
        dto.setPrice(item.getPrice());
        return dto;
    }

}
