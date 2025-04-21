package backend.controller;

import backend.dto.request.AddToCartRequest;
import backend.dto.request.RemoveCartItemRequest;
import backend.dto.response.ApiResponse;
import backend.dto.response.CartResponse;
import backend.entity.Cart;
import backend.service.CartService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true)
public class CartController {
    private CartService cartService;

    @GetMapping("/{userId}")
    public ApiResponse<CartResponse> getCart(@PathVariable Integer userId){
        Cart cart =  cartService.getCartByUserId(userId);
        CartResponse cartResponse = new CartResponse();
        cartResponse.setCartItemList(cart.getCartItemList());
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
