package ac.nsbm.bookshop_delivery_system.service;

import ac.nsbm.bookshop_delivery_system.dto.ChangePasswordRequest;
import ac.nsbm.bookshop_delivery_system.dto.RegisterRequest;
import ac.nsbm.bookshop_delivery_system.dto.UserProfileDto;
import ac.nsbm.bookshop_delivery_system.entity.Role;
import ac.nsbm.bookshop_delivery_system.entity.User;
import ac.nsbm.bookshop_delivery_system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // Define where to save uploaded images
    private final String UPLOAD_DIR = "src/main/resources/static/images/profiles/";

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public User registerUser(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already in use");
        }

        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        try {
            user.setRole(Role.valueOf(request.getRole().toUpperCase()));
        } catch (Exception e) {
            user.setRole(Role.CUSTOMER);
        }

        user.setNewsletter(false);
        user.setPromotions(false);
        user.setNotifications(true);

        return userRepository.save(user);
    }

    public UserProfileDto getUserProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserProfileDto dto = new UserProfileDto();
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEmail(user.getEmail());
        dto.setPhone(user.getPhone());
        dto.setAddress(user.getAddress());
        dto.setBirthDate(user.getBirthDate());

        dto.setNewsletter(user.isNewsletter());
        dto.setPromotions(user.isPromotions());
        dto.setNotifications(user.isNotifications());
        dto.setPreferredCategory(user.getPreferredCategory());

        if (user.getRole() == Role.BOOKSELLER) {
            dto.setStoreName(user.getStoreName());
            dto.setWebsite(user.getWebsite());
        } else if (user.getRole() == Role.DELIVERY_PERSON) {
            dto.setVehicleType(user.getVehicleType());
            dto.setLicensePlate(user.getLicensePlate());
            dto.setDeliveryArea(user.getDeliveryArea());
        }

        return dto;
    }

    @Transactional
    public User updateUserProfile(String email, UserProfileDto profileDto) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (profileDto.getFirstName() != null) user.setFirstName(profileDto.getFirstName());
        if (profileDto.getLastName() != null) user.setLastName(profileDto.getLastName());
        if (profileDto.getPhone() != null) user.setPhone(profileDto.getPhone());
        if (profileDto.getAddress() != null) user.setAddress(profileDto.getAddress());
        if (profileDto.getBirthDate() != null) user.setBirthDate(profileDto.getBirthDate());

        if (profileDto.getNewsletter() != null) user.setNewsletter(profileDto.getNewsletter());
        if (profileDto.getPromotions() != null) user.setPromotions(profileDto.getPromotions());
        if (profileDto.getNotifications() != null) user.setNotifications(profileDto.getNotifications());
        if (profileDto.getPreferredCategory() != null) user.setPreferredCategory(profileDto.getPreferredCategory());

        if (user.getRole() == Role.BOOKSELLER) {
            if (profileDto.getStoreName() != null) user.setStoreName(profileDto.getStoreName());
            if (profileDto.getWebsite() != null) user.setWebsite(profileDto.getWebsite());
        } else if (user.getRole() == Role.DELIVERY_PERSON) {
            if (profileDto.getVehicleType() != null) user.setVehicleType(profileDto.getVehicleType());
            if (profileDto.getLicensePlate() != null) user.setLicensePlate(profileDto.getLicensePlate());
            if (profileDto.getDeliveryArea() != null) user.setDeliveryArea(profileDto.getDeliveryArea());
        }

        return userRepository.save(user);
    }

    @Transactional
    public void changePassword(String email, ChangePasswordRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new RuntimeException("Incorrect current password");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }

    // --- FIX: Added deleteProfile Method ---
    @Transactional
    public void deleteProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        userRepository.delete(user);
    }

    // --- FIX: Added uploadProfileImage Method ---
    public String uploadProfileImage(String email, MultipartFile file) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        try {
            // Ensure directory exists
            Path uploadPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Create unique filename
            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            Path filePath = uploadPath.resolve(fileName);

            // Save file
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // Return the relative path or URL (adjust based on how you serve static files)
            return "/images/profiles/" + fileName;

        } catch (IOException e) {
            throw new RuntimeException("Failed to upload image: " + e.getMessage());
        }
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}