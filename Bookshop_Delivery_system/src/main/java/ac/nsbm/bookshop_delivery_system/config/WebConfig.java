package ac.nsbm.bookshop_delivery_system.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import java.nio.file.Paths;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Serve profile images from the physical project directory
        String uploadDir = "src/main/resources/static/images/profiles/";
        String physicalPath = Paths.get(uploadDir).toAbsolutePath().toUri().toString();

        registry.addResourceHandler("/images/profiles/**")
                .addResourceLocations(physicalPath);

        // Standard static resource mappings
        registry.addResourceHandler("/images/**")
                .addResourceLocations("classpath:/static/images/");

        registry.addResourceHandler("/frontend/**")
                .addResourceLocations("classpath:/static/frontend/");

        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/static/");
    }
}