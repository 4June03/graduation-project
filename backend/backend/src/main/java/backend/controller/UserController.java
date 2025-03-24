package backend.controller;

import backend.dto.request.LoginRequest;
import backend.dto.request.RegisterUserRequest;
import backend.dto.response.ApiResponse;
import backend.dto.response.LoginResponse;
import backend.dto.response.RegisterUserResponse;
import backend.entity.User;
import backend.mapper.UserMapper;
import backend.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true)
public class UserController {

    private UserService userService;
    private UserMapper userMapper;

    @PostMapping("/api/register")
    public ResponseEntity<ApiResponse<RegisterUserResponse>> registerUser(@RequestBody RegisterUserRequest request){
       User user =  userService.createUser(request);
        RegisterUserResponse response = userMapper.userToRegisterUserResponse(user);
        System.out.println("Mapped response: " + response);

        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(response,"Đăng ký user thành công"));
    }

    @PostMapping("/api/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@RequestBody LoginRequest request){
        String token = userService.login(request);

        if(token.isEmpty()){
            throw new RuntimeException("Đăng nhập thất bại");
        }

        LoginResponse response = LoginResponse.builder().accessToken(token).build();

        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.success(response, "Đăng nhập thành công"));
    }
}
