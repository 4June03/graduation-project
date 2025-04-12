package backend.mapper;

import backend.dto.request.RegisterUserRequest;
import backend.dto.response.RegisterUserResponse;
import backend.entity.User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-04-13T00:08:38+0700",
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
}
