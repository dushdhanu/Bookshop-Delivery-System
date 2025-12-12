package ac.nsbm.bookshop_delivery_system.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Maps http://localhost:8080/images/filename.jpg
        registry.addResourceHandler("/images/**")
                // Load from local file system (for newly uploaded books)
                .addResourceLocations("file:src/main/resources/static/images/")
                // Load from classpath (for default/static images in built jar)
                .addResourceLocations("classpath:/static/images/");
    }
}