package backend;

import backend.entity.Role;
import backend.entity.User;
import backend.repository.RoleRepository;
import backend.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class BackendApplication {



	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

}
