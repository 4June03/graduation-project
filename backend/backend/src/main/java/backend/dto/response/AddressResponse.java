package backend.dto.response;

import backend.entity.Address;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddressResponse {
    private Integer addressId;
    private String addressDetail;
    // không chứa back-reference tới User
    public AddressResponse(Address a) {
        this.addressId = a.getAddressId();
        this.addressDetail = a.getAddressDetail();
    }
}
