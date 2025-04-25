package backend.service.ServiceImpls;

import backend.dto.request.LoginRequest;
import backend.dto.request.RegisterUserRequest;
import backend.dto.request.UpdateUserAddressRequest;
import backend.entity.Address;
import backend.entity.Role;
import backend.entity.User;
import backend.mapper.UserMapper;
import backend.repository.RoleRepository;
import backend.repository.UserRepository;
import backend.service.UserService;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.text.ParseException;
import java.time.Instant;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;
@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true)
public class UserServiceImpls implements UserService {

    @NonFinal //đánh dấu để k inject vào constructor
    @Value("${jwt.signerKey}")
    protected String SIGNER_KEY;
    private static Logger log = LoggerFactory.getLogger(UserServiceImpls.class);

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
        user.setCreatedAt(LocalDate.now());
        user.setIsActive(true);

        // Lấy role "USER" từ CSDL, nếu chưa tồn tại thì có thể tạo mới (tùy vào logic của bạn)
        Role role = roleRepository.findByName("USER")
                .orElseThrow(() -> new RuntimeException("Role không tồn tại")); // Hoặc tạo mới nếu cần
        Set<Role> roles = new HashSet<>();

        roles.add(role);
        user.setRoles(roles);

       return userRepository.save(user);

    }


    @Override
    public String buildScope(User user){ //Phương thức để build Roles scope vì role scope trong toke cách nhau 1 space
        StringJoiner stringJoiner = new StringJoiner(" "); //1 space mỗi Role
        //Cập nhật lại Role của User
        if(!CollectionUtils.isEmpty(user.getRoles())){
            user.getRoles().forEach(role->{
                stringJoiner.add(role.getName()); //Add list role vào scope
            });
        }

        return stringJoiner.toString();
    }

    //Method trả về Token
    @Override
    public String generateToken(User user) { //đổi param thành user để lấy ttin user
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);

        JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                .subject(user.getEmail())
                .issuer(user.getFirstName()+"-"+user.getLastName())
                .issueTime(new Date())
                .expirationTime(new Date(Instant.now().plus(1, ChronoUnit.HOURS).toEpochMilli()))
                .jwtID(UUID.randomUUID().toString())
                .claim("scope", buildScope(user))
                .claim("userId", user.getUserId())
                .build();

        Payload payload = new Payload(claimsSet.toJSONObject());

        JWSObject jwsObject = new JWSObject(header, payload);

        try {
            jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));
            return jwsObject.serialize(); //Trả về token theo kiểu String

        } catch (KeyLengthException e) {
            throw new RuntimeException("Lỗi tạo token"+ e.getMessage());
        } catch (JOSEException e) {
            log.error("Không thể tạo token");
            throw new RuntimeException(e);
        }
    }

    @Override
    public SignedJWT verifyToken(String token) throws JOSEException, ParseException {
        JWSVerifier verifier = new MACVerifier(SIGNER_KEY.getBytes());

        SignedJWT signedToken = SignedJWT.parse(token);

        Date expiryTime = signedToken.getJWTClaimsSet().getExpirationTime();

        var verified = signedToken.verify(verifier);

        if(!verified && expiryTime.after(new Date())){
            throw new RuntimeException("Token không hợp lệ");
        }

        return signedToken;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(Integer userId) {
        return userRepository
                .findById(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy user với id "+userId));
    }

    @Override
    public User updateUserInfo(Integer userId, RegisterUserRequest request) {
        User user = userRepository
                .findById(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy user với id "+userId));

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPhone(request.getPhone());
        user.setDob(request.getDob());
        user.setUpdatedAt(LocalDate.now());

        userRepository.save(user);

        return user;
    }

    @Override
    public User updateUserAddresses(Integer userId, UpdateUserAddressRequest request) {
        User user = userRepository
                .findById(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy user với id "+userId));

        user.getAddresses().clear();
        for(Address address : request.getAddresses()){
            address.setUser(user);
            user.getAddresses().add(address);
        }

        user.setUpdatedAt(LocalDate.now());
        userRepository.save(user);

        return user;
    }

    @Override
    public String login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail()).orElseThrow(()->new RuntimeException("Email chưa đăng kí tài khoản"));


        boolean authenticated = passwordEncoder.matches(request.getPassword(), user.getPassword());

        if(!authenticated) {
            throw new RuntimeException("Thông tin đăng nhập không chính xác");
        }

        String token = generateToken(user);

        return token;
    }
}
