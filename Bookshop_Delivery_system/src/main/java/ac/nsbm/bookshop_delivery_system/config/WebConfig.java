package ac.nsbm.bookshop_delivery_system.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5500", "http://127.0.0.1:5500", "http://localhost:63342")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Points to static/images/ folder
        registry.addResourceHandler("/images/**")
                .addResourceLocations("classpath:/static/images/");

        // UPDATED: Points exactly to the frontend root folder to avoid path mismatches
        registry.addResourceHandler("/frontend/**")
                .addResourceLocations("classpath:/static/frontend/");

        // Catch-all for root level files like favicon.ico or index.html
        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/static/");
    }
}