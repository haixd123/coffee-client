package com.example.coffee2.config;

import com.example.coffee2.service.user.UserService;
import lombok.extern.java.Log;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@Log4j2
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean(BeanIds.AUTHENTICATION_MANAGER)
    @Override
    public AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

    @Autowired
    UserService userService;

    // phân quyền
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().ignoringAntMatchers("/**");
        http.authorizeRequests().antMatchers("/api/authors/**","/api/payment/**", "/ws/websocket", "/app/**", "/api/notify/**", "http://localhost:4200/", "/").permitAll()
                .anyRequest().authenticated()
                .and().csrf().disable();
        //???
//        http.cors();
//        http.cors().configurationSource(corsConfigurationSource());
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling();
        http.sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.cors().configurationSource(request -> new CorsConfiguration().applyPermitDefaultValues());

    }


//        @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        http
//                .cors().and().csrf().disable() // Tắt CSRF để dễ dàng thử nghiệm với Postman
//                .authorizeRequests()
//                .anyRequest().permitAll()
//                .and()
//                .httpBasic(); // Sử dụng xác thực cơ bản
//    }


//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        CorsConfiguration config = new CorsConfiguration();
//        config.setAllowCredentials(true);
//        config.addAllowedOrigin("http://localhost:4200");  // Thay đổi thành domain của Angular của bạn
//        config.addAllowedHeader("*");
//        config.addAllowedMethod(HttpMethod.GET);
//        config.addAllowedMethod(HttpMethod.POST);
//        config.addAllowedMethod(HttpMethod.PUT);
//        config.addAllowedMethod(HttpMethod.DELETE);
//
//        // Thêm các đường dẫn cụ thể mà bạn muốn áp dụng cấu hình CORS
//        source.registerCorsConfiguration("/api/authors/**", config);
//        // Thêm các đường dẫn khác nếu cần
//
//        return source;
//    }

    // xắc thực
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService).passwordEncoder(passwordEncoder());

    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(10);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
//                registry.addMapping("/api/**")
//                        .allowedOrigins("*")
                        .allowedOrigins("http://localhost:4200")
                        .allowedMethods("GET", "POST", "PUT", "DELETE")
                        .allowedMethods("*")
                        .allowedHeaders("*")
                        .allowedHeaders("Authorization", "Content-Type")
                        .allowCredentials(false)
                        .maxAge(3600);

            }
        };
    }


    //??? formLogin này là gì,
//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        http.authorizeRequests()
//                .antMatchers("/**").permitAll()
//                .antMatchers("/admin/**").hasRole("ADMIN")
//                .anyRequest().authenticated();
////                .and().formLogin();
//    }
//


//    @Override
//    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//        auth.inMemoryAuthentication()
//                .withUser("user").password(passwordEncoder().encode("password")).roles("USER")
//                .and()
//                .withUser("admin").password(passwordEncoder().encode("adminPassword")).roles("ADMIN");
//    }
//
//    //    ??? k muốn đăng nhập nhưng muốn getList thì sao?
//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        http.cors().and().authorizeRequests()
//                .antMatchers("/**").permitAll()
//                .anyRequest().permitAll()
////                .anyRequest().authenticated()
//                .and().httpBasic();
//    }


//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//
//    @Bean
//    public WebMvcConfigurer corsConfigurer() {
//        return new WebMvcConfigurer() {
//            @Override
//            public void addCorsMappings(CorsRegistry registry) {
//                registry.addMapping("/**")
////                registry.addMapping("/api/**")
//                        .allowedOrigins("*")
//                        .allowedMethods("GET", "POST", "PUT", "DELETE")
//                        .allowedHeaders("*")
////                        .allowedHeaders("Authorization", "Content-Type")
//                        .allowCredentials(false)
//                        .maxAge(3600);
//            }
//        };
//    }
};

