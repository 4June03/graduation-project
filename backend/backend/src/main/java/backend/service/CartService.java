package backend.service;

import backend.dto.request.AddToCartRequest;
import backend.dto.request.RemoveCartItemRequest;
import backend.dto.response.ApiResponse;
import backend.entity.Cart;

public interface CartService {
    public void addToCart(AddToCartRequest request);

    Cart getCartByUserId(Integer userId);

    void removeCartItem(RemoveCartItemRequest request);
}
