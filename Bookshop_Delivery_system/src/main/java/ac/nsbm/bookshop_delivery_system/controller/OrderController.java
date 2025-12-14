package ac.nsbm.bookshop_delivery_system.controller;

import ac.nsbm.bookshop_delivery_system.entity.Order;
import ac.nsbm.bookshop_delivery_system.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/my-orders")
    public ResponseEntity<List<Order>> getMyOrders(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(orderService.getUserOrders(email));
    }

    @PostMapping("/place")
    public ResponseEntity<Order> placeOrder(Authentication authentication, @RequestBody ac.nsbm.bookshop_delivery_system.dto.OrderRequest request) {
        String email = authentication.getName();
        return ResponseEntity.ok(orderService.placeOrder(email, request));
    }

    // --- FIX: ADDED DELETE ENDPOINT ---
    @DeleteMapping("/{orderId}")
    public ResponseEntity<String> deleteOrder(Authentication authentication, @PathVariable Long orderId) {
        String email = authentication.getName();
        try {
            orderService.deleteOrder(email, orderId);
            return ResponseEntity.ok("Order deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}