package ac.nsbm.bookshop_delivery_system;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class BookshopDeliverySystemApplication {

    private static final Logger logger = LoggerFactory.getLogger(BookshopDeliverySystemApplication.class);

    public static void main(String[] args) {
        try {
            ApplicationContext ctx = SpringApplication.run(BookshopDeliverySystemApplication.class, args);
            logger.info("Bookshop Delivery System started successfully!");
        } catch (Exception e) {
            logger.error("Application failed to start: ", e);
        }
    }
}