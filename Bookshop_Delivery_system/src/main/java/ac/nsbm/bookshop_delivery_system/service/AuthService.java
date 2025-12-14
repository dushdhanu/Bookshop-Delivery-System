package ac.nsbm.bookshop_delivery_system.service;

import ac.nsbm.bookshop_delivery_system.dto.AuthRequest;
import ac.nsbm.bookshop_delivery_system.dto.AuthResponse;
import ac.nsbm.bookshop_delivery_system.dto.RegisterRequest;
import ac.nsbm.bookshop_delivery_system.entity.Role;
import ac.nsbm.bookshop_delivery_system.entity.User;
import ac.nsbm.bookshop_delivery_system.repository.UserRepository;
import ac.nsbm.bookshop_delivery_system.util.JwtUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtils jwtUtils, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
        this.authenticationManager = authenticationManager;
    }

    public AuthResponse register(RegisterRequest request) {
        // 1. Check if email exists
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        // 2. Determine Role
        Role userRole = Role.CUSTOMER;
        if (request.getRole() != null && !request.getRole().isEmpty()) {
            try {
                userRole = Role.valueOf(request.getRole().toUpperCase());
            } catch (IllegalArgumentException e) {
                userRole = Role.CUSTOMER;
            }
        }

        // 3. Create User (Using standard setters - Fixes 'cannot find builder' error)
        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(userRole);

        // 4. Save User
        userRepository.save(user);

        // 5. Generate Token
        String token = jwtUtils.generateToken(new CustomUserDetails(user));

        // 6. Return Response (Passes 3 args - Fixes constructor error)
        return new AuthResponse(token, user.getRole().name(), user.getId());
    }

    public AuthResponse login(AuthRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
        } catch (Exception e) {
            throw new BadCredentialsException("Invalid email or password");
        }

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtUtils.generateToken(new CustomUserDetails(user));

        // 6. Return Response (Passes 3 args - Fixes constructor error)
        return new AuthResponse(token, user.getRole().name(), user.getId());
    }
}