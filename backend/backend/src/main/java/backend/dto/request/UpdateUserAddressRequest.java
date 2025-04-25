package backend.dto.request;

import backend.entity.Address;
import lombok.Data;

import java.util.Set;

@Data
public class UpdateUserAddressRequest {
    private Set<Address> addresses;
}
