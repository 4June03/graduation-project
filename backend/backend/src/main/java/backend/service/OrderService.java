package backend.service;

import backend.dto.request.OrderRequest;
import backend.entity.Order;
import backend.entity.User;

public interface OrderService {
    Order addOrder(User user, OrderRequest request);

    Order getOrderById(Integer orderId);
}
