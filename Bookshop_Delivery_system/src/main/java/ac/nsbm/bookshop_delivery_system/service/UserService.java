package ac.nsbm.bookshop_delivery_system.service;

import ac.nsbm.bookshop_delivery_system.dto.UserProfileDto;
import ac.nsbm.bookshop_delivery_system.entity.User;
import ac.nsbm.bookshop_delivery_system.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getProfile(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User updateProfile(String email, UserProfileDto dto) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setPhone(dto.getPhone());
        user.setAddress(dto.getAddress());

        // Update role specific fields
        if (dto.getStoreName() != null) user.setStoreName(dto.getStoreName());
        if (dto.getWebsite() != null) user.setWebsite(dto.getWebsite());
        if (dto.getVehicleType() != null) user.setVehicleType(dto.getVehicleType());
        if (dto.getLicensePlate() != null) user.setLicensePlate(dto.getLicensePlate());
        if (dto.getDeliveryArea() != null) user.setDeliveryArea(dto.getDeliveryArea());

        return userRepository.save(user);
    }
}
