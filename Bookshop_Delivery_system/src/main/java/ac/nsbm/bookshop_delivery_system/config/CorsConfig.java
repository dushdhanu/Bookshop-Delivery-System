package ac.nsbm.bookshop_delivery_system.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();

        // 1. Allow Credentials (cookies, authorization headers)
        config.setAllowCredentials(true);

        // 2. Allowed Frontend Origins
        // Add the URL/Port where your HTML frontend is running (e.g., Live Server)
        config.setAllowedOrigins(List.of(
                "http://localhost:63342", // IntelliJ default
                "http://127.0.0.1:5500",  // VS Code Live Server
                "http://localhost:5500"   // VS Code Live Server alternate
        ));

        // 3. Allowed Headers
        config.setAllowedHeaders(List.of("Origin", "Content-Type", "Accept", "Authorization"));

        // 4. Allowed Methods
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}