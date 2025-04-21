package backend.dto.response;

import backend.entity.CartItem;
import lombok.Getter;
import lombok.Setter;

import java.math.BigInteger;
import java.util.List;

@Getter
@Setter
public class CartResponse {
    private List<CartItem> cartItemList;
    private BigInteger total;
    private BigInteger shippingFee;
    private BigInteger grandTotal;

}
