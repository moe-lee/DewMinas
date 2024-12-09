package me.leewonjun.dewminas.controllers;

import lombok.RequiredArgsConstructor;
import me.leewonjun.dewminas.dto.SignUpRequest;
import me.leewonjun.dewminas.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
@RequiredArgsConstructor
public class SecurityApiController {
    @Autowired
    private UserService userService;

    @PostMapping("/user")
    public String signup(SignUpRequest request) {
        this.userService.save(request);
        return "redirect:/login";
    }
}
