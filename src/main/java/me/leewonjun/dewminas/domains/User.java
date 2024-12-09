package me.leewonjun.dewminas.domains;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Generated;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Getter
@NoArgsConstructor
@Entity(name = "users")
public class User implements UserDetails
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name_kor", nullable = false)
    private String nameKor;

    @Column(name = "name_eng", nullable = false)
    private String nameEng;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "nickname")
    private String nickname;

    @Column(updatable = false, nullable = false)
    private String password;

    @Column(name = "phone_number",  nullable = false)
    private  String phoneNumber;

    @Builder
    public User(String nameKor, String nameEng, String nickname, String email, String password, String phoneNumber) {
        this.nameKor = nameKor;
        this.nameEng = nameEng;
        this.nickname = nickname;
        this.password = password;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    //Update transaction
    public void changeNickname(String newName) {
        this.nickname = newName;
    }

    public boolean equals(Object o) {
        User other = (User)o;
        if(other == null) throw new NullPointerException();
        return other.getId().equals(this.id);
    }
}
