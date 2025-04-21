package backend.controller;

import backend.dto.request.LoginRequest;
import backend.dto.request.RegisterUserRequest;
import backend.dto.response.ApiResponse;
import backend.dto.response.LoginResponse;
import backend.dto.response.RegisterUserResponse;
import backend.dto.response.UserResponse;
import backend.entity.User;
import backend.mapper.UserMapper;
import backend.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true)
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private UserService userService;
    private UserMapper userMapper;


    @GetMapping("/api/users")
    public ApiResponse<List<UserResponse>> getAllUsers(){
        List<User> users = userService.getAllUsers();

        List<UserResponse> response = users.stream().map(userMapper::userToUserResponse).collect(Collectors.toList());
        return ApiResponse.success(response, "Lấy danh sách thành công");
    }

    @GetMapping("/api/user/{id}")
    public ApiResponse<UserResponse> getUserById(@PathVariable("id")Integer userId){
        User user = userService.getUserById(userId);

        UserResponse response = userMapper.userToUserResponse(user);

        return ApiResponse.success(response, "lấy thông tin user thành công");
    }

    @PutMapping("/api/user/{id}")
    public ApiResponse<UserResponse> updateUser(@PathVariable("id")Integer userId, @RequestBody RegisterUserRequest request){
        User user = userService.updateUserInfo(userId, request);

        UserResponse response = userMapper.userToUserResponse(user);

        return ApiResponse.success(response, "cập nhật thông tin user thành công");
    }

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
