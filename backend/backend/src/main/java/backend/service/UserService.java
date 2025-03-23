package backend.service;

import backend.dto.request.RegisterUserRequest;
import backend.entity.User;

public interface UserService {
    public User createUser(RegisterUserRequest user);
}
