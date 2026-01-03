package com.example.Indunil.rentvehicle_vehicleservice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        // ✅ Allow requests from your Next.js frontend
                        .allowedOrigins("http://localhost:3000")
                        // ✅ Common REST methods
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        // ✅ Allow all headers
                        .allowedHeaders("*")
                        // ✅ Enable cookies and auth headers if needed
                        .allowCredentials(true);
            }
        };
    }
}
