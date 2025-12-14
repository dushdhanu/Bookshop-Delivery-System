package ac.nsbm.bookshop_delivery_system.dto;

public class UserProfileDto {
    private String firstName;
    private String lastName;
    private String email; // Added email
    private String phone;
    private String address;
    private String birthDate;

    // Preferences
    private Boolean newsletter;
    private Boolean promotions;
    private Boolean notifications;
    private String preferredCategory;

    // For Bookseller
    private String storeName;
    private String website;

    // For Delivery Person
    private String vehicleType;
    private String licensePlate;
    private String deliveryArea;

    // Getters and Setters
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getBirthDate() { return birthDate; }
    public void setBirthDate(String birthDate) { this.birthDate = birthDate; }

    public Boolean getNewsletter() { return newsletter; }
    public void setNewsletter(Boolean newsletter) { this.newsletter = newsletter; }
    public Boolean getPromotions() { return promotions; }
    public void setPromotions(Boolean promotions) { this.promotions = promotions; }
    public Boolean getNotifications() { return notifications; }
    public void setNotifications(Boolean notifications) { this.notifications = notifications; }
    public String getPreferredCategory() { return preferredCategory; }
    public void setPreferredCategory(String preferredCategory) { this.preferredCategory = preferredCategory; }

    public String getStoreName() { return storeName; }
    public void setStoreName(String storeName) { this.storeName = storeName; }
    public String getWebsite() { return website; }
    public void setWebsite(String website) { this.website = website; }
    public String getVehicleType() { return vehicleType; }
    public void setVehicleType(String vehicleType) { this.vehicleType = vehicleType; }
    public String getLicensePlate() { return licensePlate; }
    public void setLicensePlate(String licensePlate) { this.licensePlate = licensePlate; }
    public String getDeliveryArea() { return deliveryArea; }
    public void setDeliveryArea(String deliveryArea) { this.deliveryArea = deliveryArea; }
}