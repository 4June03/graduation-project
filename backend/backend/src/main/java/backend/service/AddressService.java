package backend.service;

import backend.entity.Address;

import java.util.List;

public interface AddressService {
    List<Address> getAllAddressByUserId(Integer userId);
}
