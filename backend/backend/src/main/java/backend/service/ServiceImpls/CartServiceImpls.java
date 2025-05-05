package backend.service.ServiceImpls;

import backend.dto.request.AddToCartRequest;
import backend.dto.request.RemoveCartItemRequest;
import backend.entity.*;
import backend.repository.*;
import backend.service.CartService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true)
public class CartServiceImpls implements CartService {
    private UserRepository userRepository;
    private CartRepository cartRepository;
    private MotorBikeRepository motorBikeRepository;
    private VariantRepository variantRepository;
    private VariantColorRepository variantColorRepository;

    @Override
    public void addToCart(AddToCartRequest request) {

        User user = userRepository.findById(request
                .getUserId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy user với Id: "+request.getUserId()));

        Cart cart = cartRepository.findByUser(user)
                .orElseGet(()->Cart.builder().build());

        cart.setUser(user);

        Motorbike motorbike = motorBikeRepository
                .findById(request.getProductId())
                .orElseThrow(()->new RuntimeException("Không tìm thấy motorbike với id"+request.getProductId()));

        Variant variant = variantRepository
                .findById(request.getVariantId())
                .orElseThrow(()->new RuntimeException("Không tìm thấy biến thể với id: "+request.getVariantId()));

        VariantColor variantColor = variantColorRepository
                .findById(request.getVariantColorId())
                .orElseThrow(()->new RuntimeException("Không tìm thấy VariantColor với id: "+request.getVariantColorId()));

        if(variant.getMotorbikes().getBikeId()!=motorbike.getBikeId()){
            throw new RuntimeException("motor bike không tồn tại biến thể này bikeId: "+motorbike.getBikeId()+"- variantId-bikeId: "+variant.getMotorbikes().getBikeId());
        }
        if(variantColor.getVariant().getVariantId() != variant.getVariantId()){
            throw new RuntimeException("Biến thể và màu biến thể không khớp");
        }

        CartItem cartItem = CartItem.builder()
                .motorbike(motorbike)
                .variant(variant)
                .cart(cart)
                .variantColor(variantColor)
                .build();

        if(cart.getCartItemList()==null){
            List<CartItem> newList = new ArrayList<>();
            newList.add(cartItem);
            cart.setCartItemList(newList);
        }

        cart.getCartItemList().add(cartItem);

        cartRepository.save(cart);
    }

    @Override
    public Cart getCartByUserId(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy user với id: "+userId));

        Cart cart = cartRepository.findByUser(user).orElseGet(() -> Cart.builder().build());

        return cart;
    }

    @Transactional
    @Override
    public void removeCartItem(RemoveCartItemRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy user với id: "+request.getUserId()));
        Cart cart = cartRepository.findByUser(user).orElseThrow(()->new RuntimeException("Lỗi lấy cart"));

        CartItem cartItem = cart.getCartItemList()
                .stream().filter(c->c.getCartItemId()
                        .equals(request.getCartItemId()))
                .findFirst().orElseThrow(()->new RuntimeException("Không tìm thấy cart item với id: "+request.getCartItemId()));
        cart.getCartItemList().remove(cartItem);
        cartRepository.save(cart);
    }
}
