package ac.nsbm.bookshop_delivery_system.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user; // Customer

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> items;

    private Double totalAmount;
    private String status; // PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED

    private LocalDateTime orderDate;
    private LocalDateTime deliveryDate;

    // Shipping Details
    private String shippingAddress;
    private String city;
    private String state;
    private String zipCode;
    private String trackingNumber;

    @ManyToOne
    @JoinColumn(name = "delivery_person_id")
    private User deliveryPerson; // Assigned delivery person
}
