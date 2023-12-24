package com.lr5.auto.entity;
import jakarta.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Entity
@Table(name = "users")
public class User implements Serializable {
    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    @NotEmpty(message = "Почта не введена")
    @Pattern(regexp = "^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.]+@[a-zA-Z0-9.]+$", message = "Введите почту правильно")
    private String email;

    @Column(unique = true)
    @NotEmpty(message = "Поле логина не заполнено")
    private String login;

    @Size(min = 4, max = 2000, message = "Размер должен быть от 4 до 2000")
    @NotEmpty(message = "Введите пароль")
    private String password;

    private String role;

    private Long enterCounter = 0L;

    private String avatar;

    public User() {}

    public User(String email, String login, String password, String role) {
        this.email = email;
        this.login = login;
        this.password = password;
        this.role = role;
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public Long getEnterCounter() {
        return enterCounter;
    }

    public void setEnterCounter(Long enterCounter) {
        this.enterCounter = enterCounter;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }
}