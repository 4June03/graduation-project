package backend.dto.response;

import backend.entity.Cart;
import backend.entity.Motorbike;
import backend.entity.Variant;
import backend.entity.VariantColor;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

public class CartItemResponse {
    private Integer cartItemId;
    private Cart cart;
    private Motorbike motorbike;
    private Variant variant;
    private VariantColor variantColor;
}
