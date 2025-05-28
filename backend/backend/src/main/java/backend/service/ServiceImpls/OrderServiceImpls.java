package backend.service.ServiceImpls;

import backend.dto.request.OrderRequest;
import backend.entity.*;
import backend.enums.DeliveryMethod;
import backend.enums.OrderStatus;
import backend.enums.PaymentMethod;
import backend.enums.PaymentStatus;
import backend.repository.*;
import backend.service.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true)
public class OrderServiceImpls implements OrderService {
    private OrderRepository orderRepository;
    private CartRepository cartRepository;
    private AddressRepository addressRepository;
    private BranchRepository branchRepository;
    private MotorBikeRepository motorBikeRepository;
    private VariantRepository variantRepository;
    private VariantColorRepository variantColorRepository;

    @Transactional
    @Override
    public Order addOrder(User user, OrderRequest request) {
        // 1. Lấy giỏ hàng của người dùng
        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy giỏ hàng cho người dùng với id: " + user.getUserId()));


        // 2. Tạo đối tượng Order với các giá trị ban đầu
        Order order = Order.builder()
                .user(user) // Liên kết đơn hàng với người dùng
                .orderDate(LocalDate.now())
                .orderStatus(OrderStatus.PENDING)
                .deliveryMethod(request.getDeliveryMethod())
                .paymentStatus(PaymentStatus.PENDING)
                .paymentMethod(PaymentMethod.CASH)
                .shippingFee(request.getShippingFee())
                .subtotal(request.getSubtotal())
                .build();

        // 3. Thiết lập địa chỉ giao hàng hoặc chi nhánh dựa trên phương thức giao hàng
        if (request.getDeliveryMethod() == DeliveryMethod.HOME_DELIVERY) {
            Address shippingAddress = addressRepository.findById(request.getShippingAddressId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy địa chỉ với id: " + request.getShippingAddressId()));
            order.setShippingAddress(shippingAddress);
        } else if (request.getDeliveryMethod() == DeliveryMethod.STORE_PICKUP) {
//            Branch branch = branchRepository.findById(request.getBranchId())
//                    .orElseThrow(() -> new RuntimeException("Không tìm thấy chi nhánh với id: " + request.getBranchId()));
//            order.setBranch(branch);
            order.setDeliveryMethod(DeliveryMethod.STORE_PICKUP);
        }

        // 4. Chuyển đổi CartItem thành OrderItem
        Set<OrderItem> orderItems = new HashSet<>();
        for (CartItem cartItem : cart.getCartItemList()) {
            Motorbike motorbike = motorBikeRepository.findById(cartItem.getMotorbike().getBikeId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy motorbike với id: " + cartItem.getMotorbike().getBikeId()));
            Variant variant = variantRepository.findById(cartItem.getVariant().getVariantId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy variant với id: " + cartItem.getVariant().getVariantId()));
            VariantColor variantColor = variantColorRepository.findById(cartItem.getVariantColor().getVariantColorId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy variant color với tên: " + cartItem.getVariantColor().getVariantColorId()));

            OrderItem orderItem = OrderItem.builder()
                    .order(order)
                    .motorbike(motorbike)
                    .variant(variant)
                    .variantColor(variantColor)
//                    .quantity(cartItem.getQuantity()) // Lấy số lượng từ CartItem (nếu có), nếu không thì mặc định là 1
                    .price(cartItem.getVariant().getVariantPrice())
                    .build();
            orderItems.add(orderItem);
        }
        order.setOrderItems(orderItems);

        orderRepository.save(order);
        cartRepository.delete(cart);

        return order;
    }

    @Override
    public Order getOrderById(Integer orderId) {
        return orderRepository.findById(orderId).orElseThrow(()->new RuntimeException("Không thể lấy thông tin order với id: "+orderId));
    }

    @Override
    public List<Order> getOrdersByUser(User user) {
        return orderRepository.findByUser(user);
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public void updateOrder(Order order) {
        orderRepository.save(order);
    }

    @Override
    public void updatePaymentStatus(Integer orderId, PaymentStatus status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng với id: " + orderId));
        order.setPaymentStatus(status);
        orderRepository.save(order);
    }
}
