package me.leewonjun.dewminas.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class SignUpRequest {
    private String email;
    private String password;
    private String phoneNumber;
    private String nameKor;
    private String nameEng;
    private String nickname;
}
