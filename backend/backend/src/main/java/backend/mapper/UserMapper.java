package backend.mapper;

import backend.dto.request.RegisterUserRequest;
import backend.dto.response.RegisterUserResponse;
import backend.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    public User RegisterUserRequestToUser (RegisterUserRequest request);

    RegisterUserResponse userToRegisterUserResponse(User user);

}
