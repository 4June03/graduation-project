package backend.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RemoveCartItemRequest {
    private Integer userId;
    private Integer cartItemId;
}
