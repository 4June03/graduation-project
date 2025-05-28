package backend.service;

import backend.dto.request.OrderRequest;
import backend.entity.Order;
import backend.entity.User;
import backend.enums.PaymentStatus;

import java.util.List;

public interface OrderService {
    Order addOrder(User user, OrderRequest request);
    Order getOrderById(Integer orderId);
    List<Order> getOrdersByUser(User user);
    List<Order> getAllOrders();
    void updateOrder(Order order);

    void updatePaymentStatus(Integer orderId, PaymentStatus status);
}
