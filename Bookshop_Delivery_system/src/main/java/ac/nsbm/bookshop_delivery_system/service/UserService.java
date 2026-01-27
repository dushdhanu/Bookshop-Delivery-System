package ac.nsbm.bookshop_delivery_system.service;

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
import java.nio.file.*;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final String UPLOAD_DIR = "src/main/resources/static/images/profiles/";

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
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
        dto.setProfileImage(user.getProfileImage());
        dto.setNewsletter(user.isNewsletter());
        dto.setPromotions(user.isPromotions());
        dto.setNotifications(user.isNotifications());
        dto.setPreferredCategory(user.getPreferredCategory());

        if (user.getRole() == Role.BOOKSELLER) {
            dto.setStoreName(user.getStoreName());
        } else if (user.getRole() == Role.DELIVERY_PERSON) {
            dto.setVehicleType(user.getVehicleType());
            dto.setLicensePlate(user.getLicensePlate());
            dto.setDeliveryArea(user.getDeliveryArea());
        }
        return dto;
    }

    @Transactional
    public User updateUserProfile(String email, UserProfileDto dto) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (dto.getFirstName() != null) user.setFirstName(dto.getFirstName());
        if (dto.getLastName() != null) user.setLastName(dto.getLastName());
        if (dto.getPhone() != null) user.setPhone(dto.getPhone());
        if (dto.getAddress() != null) user.setAddress(dto.getAddress());
        if (dto.getBirthDate() != null) user.setBirthDate(dto.getBirthDate());

        // Update Preferences
        if (dto.getNewsletter() != null) user.setNewsletter(dto.getNewsletter());
        if (dto.getPromotions() != null) user.setPromotions(dto.getPromotions());
        if (dto.getNotifications() != null) user.setNotifications(dto.getNotifications());
        if (dto.getPreferredCategory() != null) user.setPreferredCategory(dto.getPreferredCategory());

        // FIXED: Explicitly mapping delivery-specific fields from DTO to User Entity
        if (user.getRole() == Role.BOOKSELLER) {
            if (dto.getStoreName() != null) user.setStoreName(dto.getStoreName());
        } else if (user.getRole() == Role.DELIVERY_PERSON) {
            if (dto.getVehicleType() != null) user.setVehicleType(dto.getVehicleType());
            if (dto.getLicensePlate() != null) user.setLicensePlate(dto.getLicensePlate());
            if (dto.getDeliveryArea() != null) user.setDeliveryArea(dto.getDeliveryArea());
        }

        return userRepository.save(user);
    }

    @Transactional
    public void changePassword(String email, String currentPassword, String newPassword) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new RuntimeException("Current password does not match");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    @Transactional
    public void deleteUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        userRepository.delete(user);
    }

    @Transactional
    public String uploadProfileImage(String email, MultipartFile file) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        try {
            Path uploadPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadPath)) Files.createDirectories(uploadPath);

            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            String imageUrl = "/images/profiles/" + fileName;
            user.setProfileImage(imageUrl);
            userRepository.save(user);
            return imageUrl;
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload image: " + e.getMessage());
        }
    }
}