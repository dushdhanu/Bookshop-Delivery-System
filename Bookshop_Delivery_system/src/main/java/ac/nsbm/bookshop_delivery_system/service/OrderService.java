package ac.nsbm.bookshop_delivery_system.service;

import ac.nsbm.bookshop_delivery_system.dto.OrderRequest;
import ac.nsbm.bookshop_delivery_system.entity.*;
import ac.nsbm.bookshop_delivery_system.repository.BookRepository;
import ac.nsbm.bookshop_delivery_system.repository.OrderRepository;
import ac.nsbm.bookshop_delivery_system.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final BookRepository bookRepository;
    private final UserRepository userRepository;

    public OrderService(OrderRepository orderRepository, BookRepository bookRepository, UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Order placeOrder(OrderRequest request, String userEmail) {
        User user = userRepository.findByEmail(userEmail).orElseThrow();

        Order order = new Order();
        order.setUser(user);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("PENDING");
        order.setShippingAddress(request.getShippingAddress());
        order.setCity(request.getCity());
        order.setState(request.getState());
        order.setZipCode(request.getZipCode());

        double totalAmount = 0;
        List<OrderItem> orderItems = new ArrayList<>();

        for (OrderRequest.OrderItemDto itemDto : request.getItems()) {
            Book book = bookRepository.findById(itemDto.getBookId()).orElseThrow();

            // Check Stock
            if (book.getStock() < itemDto.getQuantity()) {
                throw new RuntimeException("Not enough stock for book: " + book.getTitle());
            }
            book.setStock(book.getStock() - itemDto.getQuantity());
            bookRepository.save(book);

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setBook(book);
            orderItem.setQuantity(itemDto.getQuantity());
            orderItem.setPriceAtPurchase(book.getPrice());

            orderItems.add(orderItem);
            totalAmount += book.getPrice() * itemDto.getQuantity();
        }

        order.setItems(orderItems);
        order.setTotalAmount(totalAmount);

        return orderRepository.save(order);
    }

    public List<Order> getUserOrders(String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        return orderRepository.findByUserId(user.getId());
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order updateStatus(Long orderId, String status) {
        Order order = orderRepository.findById(orderId).orElseThrow();
        order.setStatus(status.toUpperCase());
        return orderRepository.save(order);
    }
    public void deleteOrder(Long id) {
        // Optional: Add check to only delete if status is PENDING
        orderRepository.deleteById(id);
    }
}