package backend.service.ServiceImpls;

import backend.dto.request.RegisterUserRequest;
import backend.entity.Role;
import backend.entity.User;
import backend.mapper.UserMapper;
import backend.repository.RoleRepository;
import backend.repository.UserRepository;
import backend.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true)
public class UserServiceImpls implements UserService {
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private UserMapper userMapper;
    private PasswordEncoder passwordEncoder;


    @Override
    public User createUser(RegisterUserRequest request) {
        if(userRepository.existsByEmail(request.getEmail())){
            throw new RuntimeException("User đã tồn tại");
        };

        User user = userMapper.RegisterUserRequestToUser(request);
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setDob(request.getDob());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setCreated_at(LocalDate.now());
        user.setIsActive(true);

        // Lấy role "USER" từ CSDL, nếu chưa tồn tại thì có thể tạo mới (tùy vào logic của bạn)
        Role role = roleRepository.findByName("USER")
                .orElseThrow(() -> new RuntimeException("Role không tồn tại")); // Hoặc tạo mới nếu cần
        Set<Role> roles = new HashSet<>();

        roles.add(role);
        user.setRoles(roles);

       return userRepository.save(user);

    }
}
