package backend.controller;

import backend.dto.request.OrderRequest;
import backend.dto.response.*;
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
    public ApiResponse<?> getUserOrders(@RequestHeader("Authorization") String authorizationHeader) {
        try {
            String token = authorizationHeader.substring(7); // Bỏ "Bearer "
            String email = userService.getUserNameFromJWT(token);
            User user = userService.getUserByEmail(email);
            List<Order> orders = orderService.getOrdersByUser(user);
            List<OrderListResponse> responses = orders.stream()
                    .map(this::toOrderListResponse)
                    .collect(Collectors.toList());
            return ApiResponse.success(responses, "Lấy danh sách đơn hàng của người dùng thành công");
        } catch (Exception e) {
            return ApiResponse.error("Lỗi khi xử lý token: " + e.getMessage());
        }
    }

    @GetMapping("/all")
    public ApiResponse<?> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        List<OrderListResponse> responses = orders.stream()
                .map(this::toOrderListResponse)
                .collect(Collectors.toList());
        return ApiResponse.success(responses, "Lấy tất cả đơn hàng thành công");
    }

    @PutMapping("/{orderId}/status")
    public ApiResponse<?> updateOrderStatus(@PathVariable("orderId") Integer orderId, @RequestParam("status") OrderStatus status) {
        Order order = orderService.getOrderById(orderId);
        if (order == null) {
            return ApiResponse.error("Không tìm thấy đơn hàng với id: " + orderId);
        }
        order.setOrderStatus(status);
        order.setUpdatedAt(LocalDate.now());
        orderService.updateOrder(order);
        OrderResponse response = toOrderResponse(order);
        return ApiResponse.success(response, "Cập nhật trạng thái đơn hàng thành công");
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


    @PutMapping("/{orderId}/payment-status")
    public ApiResponse<?> updatePaymentStatus(
            @PathVariable("orderId") Integer orderId,
            @RequestParam("status") PaymentStatus status) {
        try {
            orderService.updatePaymentStatus(orderId, status);
            Order order = orderService.getOrderById(orderId);
            OrderResponse response = toOrderResponse(order);
            return ApiResponse.success(response, "Cập nhật trạng thái thanh toán thành công");
        } catch (RuntimeException e) {
            return ApiResponse.error(e.getMessage());
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

        if (order.getShippingAddress() != null) {
            response.setShippingAddress(new AddressResponse(order.getShippingAddress()));
        }

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

    private OrderListResponse toOrderListResponse(Order order) {
        return OrderListResponse.builder()
                .orderId(order.getOrderId())
                .userId(order.getUser().getUserId())
                .orderDate(order.getOrderDate())
                .updatedAt(order.getUpdatedAt())
                .shippingFee(order.getShippingFee())
                .subtotal(order.getSubtotal())
                .deliveryMethod(order.getDeliveryMethod())
                .paymentMethod(order.getPaymentMethod())
                .orderStatus(order.getOrderStatus())
                .paymentStatus(order.getPaymentStatus())
                .build();
    }
}
