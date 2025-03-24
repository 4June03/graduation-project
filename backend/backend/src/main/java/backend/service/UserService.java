package backend.service;

import backend.dto.request.LoginRequest;
import backend.dto.request.RegisterUserRequest;
import backend.entity.User;
import com.nimbusds.jose.JOSEException;
import com.nimbusds.jwt.SignedJWT;

import java.text.ParseException;

public interface UserService {
    public User createUser(RegisterUserRequest user);

    public String login(LoginRequest request);

    public String buildScope(User user);

    public String generateToken(User user);

    public SignedJWT verifyToken(String token) throws JOSEException, ParseException;

}
