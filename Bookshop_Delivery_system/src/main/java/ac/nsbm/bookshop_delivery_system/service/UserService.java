package ac.nsbm.bookshop_delivery_system.service;

import ac.nsbm.bookshop_delivery_system.dto.UserProfileDto;
import ac.nsbm.bookshop_delivery_system.entity.Order;
import ac.nsbm.bookshop_delivery_system.entity.Role;
import ac.nsbm.bookshop_delivery_system.entity.User;
import ac.nsbm.bookshop_delivery_system.repository.FeedbackRepository;
import ac.nsbm.bookshop_delivery_system.repository.OrderRepository;
import ac.nsbm.bookshop_delivery_system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final FeedbackRepository feedbackRepository;
    private final PasswordEncoder passwordEncoder;

    private final Path fileStorageLocation = Paths.get("src/main/resources/static/images").toAbsolutePath().normalize();

    @Autowired
    public UserService(UserRepository userRepository,
                       OrderRepository orderRepository,
                       FeedbackRepository feedbackRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
        this.feedbackRepository = feedbackRepository;
        this.passwordEncoder = passwordEncoder;

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new RuntimeException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    public User getProfile(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }

    public User updateProfile(String currentEmail, UserProfileDto dto) {
        User user = userRepository.findByEmail(currentEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if (dto.getFirstName() != null) user.setFirstName(dto.getFirstName());
        if (dto.getLastName() != null) user.setLastName(dto.getLastName());
        if (dto.getPhone() != null) user.setPhone(dto.getPhone());
        if (dto.getAddress() != null) user.setAddress(dto.getAddress());
        if (dto.getBirthDate() != null) user.setBirthDate(dto.getBirthDate());

        // Handle Email Update
        if (dto.getEmail() != null && !dto.getEmail().equals(currentEmail)) {
            if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
                throw new RuntimeException("Email already in use");
            }
            user.setEmail(dto.getEmail());
        }

        // Update Preferences
        if (dto.getNewsletter() != null) user.setNewsletter(dto.getNewsletter());
        if (dto.getPromotions() != null) user.setPromotions(dto.getPromotions());
        if (dto.getNotifications() != null) user.setNotifications(dto.getNotifications());
        if (dto.getPreferredCategory() != null) user.setPreferredCategory(dto.getPreferredCategory());

        // Role-specific
        if (dto.getStoreName() != null) user.setStoreName(dto.getStoreName());
        if (dto.getWebsite() != null) user.setWebsite(dto.getWebsite());
        if (dto.getVehicleType() != null) user.setVehicleType(dto.getVehicleType());
        if (dto.getLicensePlate() != null) user.setLicensePlate(dto.getLicensePlate());
        if (dto.getDeliveryArea() != null) user.setDeliveryArea(dto.getDeliveryArea());

        return userRepository.save(user);
    }

    public void changePassword(String email, String currentPassword, String newPassword) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new RuntimeException("Incorrect current password");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    @Transactional
    public void deleteProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // 1. Unassign from deliveries if user is a delivery person
        List<Order> deliveries = orderRepository.findByDeliveryPersonId(user.getId());
        for (Order order : deliveries) {
            order.setDeliveryPerson(null);
            orderRepository.save(order);
        }

        // 2. Delete Orders placed by this user (Or you could set user to null if you want to keep records)
        // Here we delete them to ensure clean removal of personal data
        List<Order> myOrders = orderRepository.findByUserId(user.getId());
        orderRepository.deleteAll(myOrders);

        // 3. Delete Feedback given by this user
        feedbackRepository.deleteAll(feedbackRepository.findByUserId(user.getId()));

        // 4. Finally, delete the user
        userRepository.delete(user);
    }

    public String uploadProfileImage(String email, MultipartFile file) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        try {
            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            String imageUrl = "/images/" + fileName;
            user.setProfileImage(imageUrl);
            userRepository.save(user);

            return imageUrl;
        } catch (IOException ex) {
            throw new RuntimeException("Could not store file. Please try again!", ex);
        }
    }
}