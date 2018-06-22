package com.spring.server;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
//public class WebConfig extends WebMvcConfigurerAdapter {
//
//    private static final int MAX_AGE = 3600;
//    @Override
//    public void addCorsMappings(final CorsRegistry registry) {
//        registry.addMapping("/**")
//                .allowedOrigins("http://localhost:4200")
//                .allowedHeaders("*")
//                .allowedMethods("PUT", "DELETE", "GET", "POST", "OPTIONS")
//                .allowCredentials(false).maxAge(MAX_AGE);
//    }
//}
@EnableWebMvc
public class WebConfig extends WebMvcConfigurerAdapter {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedOrigins("*");
    }
}