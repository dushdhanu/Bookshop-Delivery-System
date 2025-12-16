package ac.nsbm.bookshop_delivery_system.controller;

import ac.nsbm.bookshop_delivery_system.dto.ChangePasswordRequest;
import ac.nsbm.bookshop_delivery_system.dto.UserProfileDto;
import ac.nsbm.bookshop_delivery_system.entity.User;
import ac.nsbm.bookshop_delivery_system.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/profile")
    public ResponseEntity<UserProfileDto> getProfile(Authentication authentication) {
        String email = authentication.getName();
        // FIX: Changed to match Service method 'getUserProfile'
        UserProfileDto userProfile = userService.getUserProfile(email);
        return ResponseEntity.ok(userProfile);
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestBody UserProfileDto userProfileDto, Authentication authentication) {
        String email = authentication.getName();
        try {
            // FIX: Changed to match Service method 'updateUserProfile'
            User updatedUser = userService.updateUserProfile(email, userProfileDto);
            return ResponseEntity.ok(updatedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", e.getMessage()));
        }
    }

    @PutMapping("/password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request, Authentication authentication) {
        String email = authentication.getName();
        try {
            // FIX: Pass the 'request' object directly, not separate strings
            userService.changePassword(email, request);
            return ResponseEntity.ok(Collections.singletonMap("message", "Password updated successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", e.getMessage()));
        }
    }

    @DeleteMapping("/profile")
    public ResponseEntity<?> deleteProfile(Authentication authentication) {
        String email = authentication.getName();
        try {
            // FIX: Service now has this method
            userService.deleteProfile(email);
            return ResponseEntity.ok(Collections.singletonMap("message", "Account deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", "Failed to delete account: " + e.getMessage()));
        }
    }

    @PostMapping("/profile/image")
    public ResponseEntity<Map<String, String>> uploadProfileImage(@RequestParam("file") MultipartFile file, Authentication authentication) {
        String email = authentication.getName();
        // FIX: Service now has this method
        String imageUrl = userService.uploadProfileImage(email, file);
        return ResponseEntity.ok(Collections.singletonMap("imageUrl", imageUrl));
    }
}