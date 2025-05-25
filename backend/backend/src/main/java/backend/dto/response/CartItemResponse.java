package backend.dto.response;

import backend.dto.request.MotorBikeDTO;
import backend.dto.request.VariantColorDTO;
import backend.dto.request.VariantDTO;
import backend.entity.Cart;
import backend.entity.Motorbike;
import backend.entity.Variant;
import backend.entity.VariantColor;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class CartItemResponse {
//    private Integer cartItemId;
//    private Cart cart;
//    private MotorBikeResponse motorbike;
//    private VariantDTO variant;
//    private VariantColorDTO variantColor;
    private Integer cartItemId;
    private Integer bikeId;
    private String motorbikeName;
    private Integer variantId;
    private Integer variantColorId;
    private String variantName;
    private String colorName;
    private Double variantPrice;
    private String imageUrl;
}
