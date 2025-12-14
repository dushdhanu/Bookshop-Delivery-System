package ac.nsbm.bookshop_delivery_system.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String author;
    private String isbn;
    private String category;
    private Double price;

    // --- THIS WAS MISSING ---
    private Integer stock;
    // ------------------------

    @Column(length = 1000)
    private String description;

    private String imageUrl;

    private String bookType;
    private String bookSize;
    private String bookFormat;

    private boolean featured;
    private boolean active = true;

    @ManyToOne
    @JoinColumn(name = "seller_id")
    private User seller;

    // --- MANUAL GETTERS AND SETTERS (Fixes 'cannot find symbol' errors) ---

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public String getIsbn() { return isbn; }
    public void setIsbn(String isbn) { this.isbn = isbn; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    // --- STOCK GETTER & SETTER ---
    public Integer getStock() { return stock; }
    public void setStock(Integer stock) { this.stock = stock; }
    // -----------------------------

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getBookType() { return bookType; }
    public void setBookType(String bookType) { this.bookType = bookType; }

    public String getBookSize() { return bookSize; }
    public void setBookSize(String bookSize) { this.bookSize = bookSize; }

    public String getBookFormat() { return bookFormat; }
    public void setBookFormat(String bookFormat) { this.bookFormat = bookFormat; }

    public boolean isFeatured() { return featured; }
    public void setFeatured(boolean featured) { this.featured = featured; }

    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }

    public User getSeller() { return seller; }
    public void setSeller(User seller) { this.seller = seller; }
}