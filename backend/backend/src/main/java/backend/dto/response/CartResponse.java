package backend.dto.response;

import backend.entity.CartItem;
import lombok.Getter;
import lombok.Setter;

import java.math.BigInteger;
import java.util.List;

@Getter
@Setter
public class CartResponse {
    private List<CartItemResponse> cartItemList;
    private Double total;
    private Double shippingFee;
    private Double grandTotal;

}
