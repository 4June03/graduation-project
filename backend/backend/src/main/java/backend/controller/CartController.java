package backend.controller;

import backend.dto.request.AddToCartRequest;
import backend.dto.request.RemoveCartItemRequest;
import backend.dto.response.ApiResponse;
import backend.dto.response.CartItemResponse;
import backend.dto.response.CartResponse;
import backend.entity.BikeImage;
import backend.entity.Cart;
import backend.entity.CartItem;
import backend.mapper.MotorBikeMapper;
import backend.mapper.VariantMapper;
import backend.service.CartService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true)
public class CartController {
    private CartService cartService;
    private MotorBikeMapper motorBikeMapper;
    private VariantMapper variantMapper;
    @GetMapping("/{userId}")
    public ApiResponse<CartResponse> getCart(@PathVariable Integer userId){
        Cart cart =  cartService.getCartByUserId(userId);
        CartResponse cartResponse = new CartResponse();

        List<CartItemResponse> listItems = new ArrayList<>();
        Double totalPrice = 0.0;

        for(CartItem c : cart.getCartItemList()){
            CartItemResponse item = CartItemResponse.builder()
                    .cartItemId(c.getCartItemId())
                    .bikeId(c.getMotorbike().getBikeId())
                    .motorbikeName(c.getMotorbike().getBikeName())
                    .variantPrice(c.getVariant().getVariantPrice())
                    .variantName(c.getVariant().getVariantName())
                    .imageUrl(c.getVariantColor().getImages().stream().findFirst().map(BikeImage::getImageUrl).toString())
                    .colorName(c.getVariantColor().getColor().getColorName())
                    .build();
            listItems.add(item);
            totalPrice+= c.getVariant().getVariantPrice();
        }

        cartResponse.setCartItemList(listItems);
        cartResponse.setTotal(totalPrice);

        if(totalPrice<20000000){
            cartResponse.setShippingFee(500000.0);
        }else{
            cartResponse.setShippingFee(0.0);
        }

        cartResponse.setGrandTotal(totalPrice+cartResponse.getShippingFee());


        return ApiResponse.success(cartResponse, "Lấy thông tin cart thành công");
    }

    @PostMapping
    public ApiResponse<String> addToCart(@RequestBody AddToCartRequest request){
        cartService.addToCart(request);
        return ApiResponse.success("OK", "Thêm sản phẩm vào giỏ hàng thành công");
    }

    @DeleteMapping
    public ApiResponse<String> removeCartItem(@RequestBody RemoveCartItemRequest request){
        cartService.removeCartItem(request);
        return ApiResponse.success(null, "Xóa cart item thành công");
    }



}
