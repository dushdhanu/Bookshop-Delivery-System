package ac.nsbm.bookshop_delivery_system.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "books")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String author;
    private Double price;
    private String description;
    private Integer stock;
    private String imageUrl;
    private String category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id", nullable = false)
    private User seller;

    public Book() {}

    public Book(String title, String author, Double price, String description, Integer stock, String imageUrl, String category) {
        this.title = title;
        this.author = author;
        this.price = price;
        this.description = description;
        this.stock = stock;
        this.imageUrl = imageUrl;
        this.category = category;
    }

    // Getters
    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getAuthor() { return author; }
    public Double getPrice() { return price; }
    public String getDescription() { return description; }
    public Integer getStock() { return stock; }
    public String getImageUrl() { return imageUrl; }
    public String getCategory() { return category; }
    public User getSeller() { return seller; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setTitle(String title) { this.title = title; }
    public void setAuthor(String author) { this.author = author; }
    public void setPrice(Double price) { this.price = price; }
    public void setDescription(String description) { this.description = description; }
    public void setStock(Integer stock) { this.stock = stock; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public void setCategory(String category) { this.category = category; }
    public void setSeller(User seller) { this.seller = seller; }
}