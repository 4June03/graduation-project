package backend.service;

import backend.dto.request.LoginRequest;
import backend.dto.request.RegisterUserRequest;
import backend.dto.request.UpdateUserAddressRequest;
import backend.entity.User;
import com.nimbusds.jose.JOSEException;
import com.nimbusds.jwt.SignedJWT;

import java.text.ParseException;
import java.util.List;

public interface UserService {
    public User createUser(RegisterUserRequest user);

    public String login(LoginRequest request);

    public String buildScope(User user);

    public String generateToken(User user);

    public SignedJWT verifyToken(String token) throws JOSEException, ParseException;

    List<User> getAllUsers();

    User getUserById(Integer userId);

    User getUserByEmail(String email);

    User updateUserInfo(Integer userId, RegisterUserRequest request);

    User updateUserAddresses(Integer userId, UpdateUserAddressRequest request);

    String getUserNameFromJWT(String token) throws ParseException, JOSEException;
}
