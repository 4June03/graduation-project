package backend.service.ServiceImpls;

import backend.entity.Address;
import backend.entity.User;
import backend.repository.AddressRepository;
import backend.repository.UserRepository;
import backend.service.AddressService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true)
public class AddressServiceImpls implements AddressService {
    private AddressRepository addressRepository;
    private UserRepository userRepository;
    @Override
    public List<Address> getAllAddressByUserId(Integer userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("Không tìm thấy user với id:"+userId));
        return addressRepository.findByUser(user);
    }
}
