package me.leewonjun.dewminas.services;

import lombok.RequiredArgsConstructor;
import me.leewonjun.dewminas.domains.User;
import me.leewonjun.dewminas.dto.SignUpRequest;
import me.leewonjun.dewminas.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public User findUser(String email) {
        return userRepository
                .findByEmail(email)
                .orElseThrow(
                        () -> new IllegalArgumentException("UserService.findUser() : no user mail - "+email)
                );
    }

    public User save(SignUpRequest request) {
        User newUser = User.builder()
                .nameKor(request.getNameKor())
                .nameEng(request.getNameEng())
                .password(bCryptPasswordEncoder.encode(request.getPassword()))
                .email(request.getEmail())
                .phoneNumber(request.getPhoneNumber())
                .nickname(request.getNickname())
                .build();
        return userRepository.save(newUser);
    }
}
