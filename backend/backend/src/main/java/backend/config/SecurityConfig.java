package backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
    private final String[] PUBLIC_ENDPOINTS = {"/api/users",
            "/api/products/category/{subcategoryId}",
            "/api/products/subcategory/{subcategoryId}",
            "/api/categories",
            "/api/subcategories","api/products"};

    private final String[] AUTH_ENDPOINTS = {"/api/users",
            "/auth/login",
            "/auth/logout",
            "/auth/register",  // Thêm dòng này
            "/auth/refreshToken"};

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(
                request ->
                        request.requestMatchers(HttpMethod.POST, PUBLIC_ENDPOINTS).permitAll()
                                .requestMatchers(HttpMethod.GET, PUBLIC_ENDPOINTS).permitAll()
                                .requestMatchers(HttpMethod.POST, AUTH_ENDPOINTS).permitAll()
                                .requestMatchers(HttpMethod.GET, AUTH_ENDPOINTS).permitAll()
                                .anyRequest().permitAll()

        );

        http.csrf(csrf -> csrf.disable()); //

        return http.build();
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}