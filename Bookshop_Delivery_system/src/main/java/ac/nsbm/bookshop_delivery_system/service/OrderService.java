package ac.nsbm.bookshop_delivery_system.service;

import ac.nsbm.bookshop_delivery_system.dto.OrderRequest;
// Explicit Imports
import ac.nsbm.bookshop_delivery_system.entity.Book;
import ac.nsbm.bookshop_delivery_system.entity.Order;
import ac.nsbm.bookshop_delivery_system.entity.OrderItem;
import ac.nsbm.bookshop_delivery_system.entity.User;
import ac.nsbm.bookshop_delivery_system.repository.BookRepository;
import ac.nsbm.bookshop_delivery_system.repository.OrderRepository;
import ac.nsbm.bookshop_delivery_system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository, UserRepository userRepository, BookRepository bookRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
    }

    @Transactional
    public Order placeOrder(String email, OrderRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Order order = new Order();
        order.setUser(user);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("PENDING");
        order.setShippingAddress(request.getShippingAddress());
        order.setCity(request.getCity());
        order.setState(request.getState());
        order.setZipCode(request.getZipCode());
        order.setTotalAmount(0.0);

        List<OrderItem> items = new ArrayList<>();
        double total = 0;

        for (OrderRequest.OrderItemDto itemDto : request.getItems()) {
            Book book = bookRepository.findById(itemDto.getBookId())
                    .orElseThrow(() -> new RuntimeException("Book not found"));

            // Check Stock (Uses getStock from Book.java)
            if (book.getStock() == null || book.getStock() < itemDto.getQuantity()) {
                throw new RuntimeException("Insufficient stock for book: " + book.getTitle());
            }

            // Deduct Stock
            book.setStock(book.getStock() - itemDto.getQuantity());
            bookRepository.save(book);

            // Create Order Item
            OrderItem item = new OrderItem();
            item.setOrder(order); // This calls the method in OrderItem.java
            item.setBook(book);
            item.setQuantity(itemDto.getQuantity());
            item.setPriceAtPurchase(book.getPrice());

            items.add(item);
            total += book.getPrice() * itemDto.getQuantity();
        }

        order.setItems(items);
        order.setTotalAmount(total);

        return orderRepository.save(order);
    }

    public List<Order> getUserOrders(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return orderRepository.findByUserId(user.getId());
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order updateOrderStatus(Long orderId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(status);
        return orderRepository.save(order);
    }

    @Transactional
    public void deleteOrder(String email, Long orderId) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!order.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("You are not authorized to delete this order");
        }

        if (!"PENDING".equalsIgnoreCase(order.getStatus())) {
            throw new RuntimeException("Cannot delete order that is " + order.getStatus());
        }

        // Restore stock
        for (OrderItem item : order.getItems()) {
            Book book = item.getBook();
            if (book != null) {
                book.setStock(book.getStock() + item.getQuantity());
                bookRepository.save(book);
            }
        }

        orderRepository.delete(order);
    }
}