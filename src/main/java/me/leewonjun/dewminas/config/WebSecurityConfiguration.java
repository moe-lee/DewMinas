package me.leewonjun.dewminas.config;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import me.leewonjun.dewminas.services.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import static org.springframework.boot.autoconfigure.security.servlet.PathRequest.toH2Console;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfiguration {
    @Autowired
    private final CustomUserDetailsService customUserDetailsService;


    // WebSecurityCustomizer를 이용하여 endpoint를 설정한다.
    // WebSecurityCustomizer는 함수형 인터페이스로 전략 패턴의 전락 객체로 이용됨.
    @Bean
    public WebSecurityCustomizer configure() {
        return (web) -> {
            // web은 WebSecurity 클래스 인스턴스, h2콘솔과 정적파일 경로는 오픈. / 자바 스크립트 주입 공격에 취약함.
            web.ignoring().requestMatchers(toH2Console())
                    .requestMatchers(new AntPathRequestMatcher("/static/**"));
        };
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .authorizeHttpRequests((auth) -> {
                    // 로그인, 회원가입, 회원가입용 url을 제외한 url에 대해 인증을 요구함.
                    // 권한 부여는 이후 생각해볼 과제.
                    auth.requestMatchers(
                            "/login", "/signup", "/user"
                    )
                            .permitAll()
                            .anyRequest().authenticated();
                })
                .formLogin((formLogin)->{
                    // profile은 원래 요청 파라미터를 이용해 페이지를 보여줬으나, 이제 SecurityContext를 이용해서 보여줄 필요가 있다.
                    formLogin.loginPage("/login").defaultSuccessUrl("/profile"); // AuthenticationSuccessHandler에 의해 DefaultSeccessUrl로 리다이렉트 된다.
                })
                .logout((logout) -> {
                    logout.logoutSuccessUrl("/login")
                            .invalidateHttpSession(true);

                })
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(
        HttpSecurity http,
        BCryptPasswordEncoder bCryptPasswordEncoder,
        CustomUserDetailsService userDetailsService
    ) throws Exception {
        // AuthenticationManager에 의해 호출되고 UsernamePasswordAuthenticationToken을 전달 받아 검증한다.
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(customUserDetailsService);
        authProvider.setPasswordEncoder(bCryptPasswordEncoder);
        return new ProviderManager(authProvider);
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
