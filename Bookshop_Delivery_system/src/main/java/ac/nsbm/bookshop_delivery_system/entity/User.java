package ac.nsbm.bookshop_delivery_system.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Ensure these match the fields being set in AuthService.register()
    private String firstName;
    private String lastName;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    private String phone;
    private String address;
    private String birthDate;
    private String profileImage;

    private boolean newsletter;
    private boolean promotions;
    private boolean notifications;
    private String preferredCategory;

    @Enumerated(EnumType.STRING)
    private Role role;

    // Bookseller specific fields
    private String storeName;
    private String website;

    // Delivery Person specific fields
    private String employeeId;
    private String vehicleType;
    private String licensePlate;
    private String deliveryArea;

    // --- CONSTRUCTORS ---
    public User() {}

    // --- MANUAL GETTERS AND SETTERS ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getBirthDate() { return birthDate; }
    public void setBirthDate(String birthDate) { this.birthDate = birthDate; }

    public String getProfileImage() { return profileImage; }
    public void setProfileImage(String profileImage) { this.profileImage = profileImage; }

    public boolean isNewsletter() { return newsletter; }
    public void setNewsletter(boolean newsletter) { this.newsletter = newsletter; }

    public boolean isPromotions() { return promotions; }
    public void setPromotions(boolean promotions) { this.promotions = promotions; }

    public boolean isNotifications() { return notifications; }
    public void setNotifications(boolean notifications) { this.notifications = notifications; }

    public String getPreferredCategory() { return preferredCategory; }
    public void setPreferredCategory(String preferredCategory) { this.preferredCategory = preferredCategory; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public String getStoreName() { return storeName; }
    public void setStoreName(String storeName) { this.storeName = storeName; }

    public String getWebsite() { return website; }
    public void setWebsite(String website) { this.website = website; }

    public String getEmployeeId() { return employeeId; }
    public void setEmployeeId(String employeeId) { this.employeeId = employeeId; }

    public String getVehicleType() { return vehicleType; }
    public void setVehicleType(String vehicleType) { this.vehicleType = vehicleType; }

    public String getLicensePlate() { return licensePlate; }
    public void setLicensePlate(String licensePlate) { this.licensePlate = licensePlate; }

    public String getDeliveryArea() { return deliveryArea; }
    public void setDeliveryArea(String deliveryArea) { this.deliveryArea = deliveryArea; }
}