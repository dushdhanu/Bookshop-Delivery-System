package ac.nsbm.bookshop_delivery_system.service;

import ac.nsbm.bookshop_delivery_system.dto.OrderRequest;
import ac.nsbm.bookshop_delivery_system.entity.Book;
import ac.nsbm.bookshop_delivery_system.entity.Order;
import ac.nsbm.bookshop_delivery_system.entity.OrderItem;
import ac.nsbm.bookshop_delivery_system.repository.BookRepository;
import ac.nsbm.bookshop_delivery_system.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private OrderRepository orderRepository;

    // 1. PLACE ORDER
    @Transactional
    public Order placeOrder(String email, OrderRequest request) {
        Order order = new Order();
        order.setEmail(email);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("PENDING");

        double total = 0;
        List<OrderItem> orderItems = new ArrayList<>();

        for (OrderRequest.OrderItemDto itemDto : request.getItems()) {
            Book book = bookRepository.findById(itemDto.getBookId())
                    .orElseThrow(() -> new RuntimeException("Book not found"));

            // Stock Check
            if (book.getStock() == null || book.getStock() < itemDto.getQuantity()) {
                throw new RuntimeException("Insufficient stock for: " + book.getTitle());
            }

            // Deduct Stock
            book.setStock(book.getStock() - itemDto.getQuantity());
            bookRepository.save(book);

            OrderItem item = new OrderItem();
            item.setOrder(order);
            item.setBook(book);
            item.setQuantity(itemDto.getQuantity());
            item.setPriceAtPurchase(book.getPrice());

            orderItems.add(item);
            total += book.getPrice() * itemDto.getQuantity();
        }

        order.setItems(orderItems);
        order.setTotalAmount(total);
        return orderRepository.save(order);
    }

    // 2. GET USER ORDERS (Fixes 'Cannot resolve method')
    public List<Order> getUserOrders(String email) {
        return orderRepository.findAllByEmail(email);
    }

    // 3. GET ALL ORDERS (Admin)
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // 4. GET ORDER BY ID
    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    // 5. UPDATE STATUS
    public Order updateOrderStatus(Long id, String status) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(status);
        return orderRepository.save(order);
    }

    // 6. DELETE ORDER (Fixes 'Delete Order' Button)
    @Transactional
    public void deleteOrder(String email, Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        // Optional: Verify user owns the order
        // if (!order.getEmail().equals(email)) throw new RuntimeException("Unauthorized");

        // RESTORE STOCK Logic
        if (order.getItems() != null) {
            for (OrderItem item : order.getItems()) {
                Book book = item.getBook();
                if (book != null) {
                    int currentStock = (book.getStock() == null) ? 0 : book.getStock();
                    book.setStock(currentStock + item.getQuantity());
                    bookRepository.save(book);
                }
            }
        }
        orderRepository.delete(order);
    }
}