package backend.mapper;

import backend.dto.request.RegisterUserRequest;
import backend.dto.response.RegisterUserResponse;
import backend.dto.response.UserResponse;
import backend.entity.Address;
import backend.entity.User;
import java.util.LinkedHashSet;
import java.util.Set;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-05-31T22:27:23+0700",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 17.0.1 (Oracle Corporation)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public User RegisterUserRequestToUser(RegisterUserRequest request) {
        if ( request == null ) {
            return null;
        }

        User user = new User();

        user.setFirstName( request.getFirstName() );
        user.setLastName( request.getLastName() );
        user.setEmail( request.getEmail() );
        user.setPassword( request.getPassword() );
        user.setPhone( request.getPhone() );
        user.setDob( request.getDob() );

        return user;
    }

    @Override
    public RegisterUserResponse userToRegisterUserResponse(User user) {
        if ( user == null ) {
            return null;
        }

        RegisterUserResponse registerUserResponse = new RegisterUserResponse();

        registerUserResponse.setFirstName( user.getFirstName() );
        registerUserResponse.setLastName( user.getLastName() );
        registerUserResponse.setEmail( user.getEmail() );
        registerUserResponse.setCreatedAt( user.getCreatedAt() );
        registerUserResponse.setIsActive( user.getIsActive() );

        return registerUserResponse;
    }

    @Override
    public UserResponse userToUserResponse(User user) {
        if ( user == null ) {
            return null;
        }

        UserResponse userResponse = new UserResponse();

        userResponse.setFirstName( user.getFirstName() );
        userResponse.setLastName( user.getLastName() );
        userResponse.setEmail( user.getEmail() );
        userResponse.setPhone( user.getPhone() );
        userResponse.setAvatar( user.getAvatar() );
        userResponse.setDob( user.getDob() );
        userResponse.setCreatedAt( user.getCreatedAt() );
        userResponse.setUpdatedAt( user.getUpdatedAt() );
        userResponse.setIsActive( user.getIsActive() );
        Set<Address> set = user.getAddresses();
        if ( set != null ) {
            userResponse.setAddresses( new LinkedHashSet<Address>( set ) );
        }

        return userResponse;
    }
}
