package com.lr5.auto.controller;
import com.lr5.auto.entity.User;
import com.lr5.auto.repos.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.validation.ObjectError;
import org.springframework.validation.FieldError;
import org.springframework.http.MediaType;

import javax.validation.Valid;
import java.util.*;

@RestController
public class UserController {
    private final UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/users")
    public List<User> user_page(@RequestBody Map<String, String> login){
        List<User> userList = new ArrayList<>();
        userList.addAll(userRepository.findAllByLogin(login.get("login")));
        return userList;
    }

    @PostMapping("/get_user")
    public User getUser(@RequestBody Map<String, String> login){
        User user = userRepository.findByLogin(login.get("login"));
        return user;
    }

    @GetMapping("/get_users")
    public List<User> getUsers(){
        List<User> userList = new ArrayList<>();
        userList.addAll((Collection<? extends User>) userRepository.findAll());
        return userList;
    }

    @PostMapping("/")
    public String login(@RequestBody User user){
        for (User u : userRepository.findAll()){
            if (u.getLogin().equals(user.getLogin()))
                if (u.getPassword().equals(user.getPassword())) {
                    u.setEnterCounter(u.getEnterCounter() + 1);
                    userRepository.save(u);
                    if (u.getRole().equals("Пользователь")) return "news_page";
                    if (u.getRole().equals("Администратор")) return "news_page2";
                    if (u.getRole().equals("Модератор")) return "moder_news_page";
                }
                else return "Неверный пароль!";
        }
        return "Такого пользователя не существует!";
    }

    @PostMapping(value = "/registration_page", consumes = MediaType.APPLICATION_JSON_VALUE)
    public String addUser(@RequestBody @Valid User user, BindingResult bindingResult){
        List<User> userList = new ArrayList<>();
        userRepository.findAll().forEach(it -> userList.add(it));
        if (bindingResult.hasErrors()){
            String result = "";
            List<ObjectError> errors = bindingResult.getAllErrors();
            for(ObjectError i : errors){
                String fieldErrors = ((FieldError) i).getField();
                result += (fieldErrors + " - " + i.getDefaultMessage() + "\n");
            }
            return result;
        }

        for (User user1 : userRepository.findAll()){
            if (user1.getLogin().equals(user.getLogin()))
                return "Такой логин уже существует";
            else if (user1.getEmail().equals(user.getEmail()))
                return "Такая почта уже существует";
        }
        userRepository.save(user);
        return "OK";
    }

    @PostMapping("/delete_user")
    @Transactional
    public String deleteUser(@RequestBody Map<String, String> login){
        userRepository.deleteByLogin(login.get("login"));
        return "OK";
    }

    @PostMapping("/edit_user")
    public String edit_user(@RequestBody @Valid User user, BindingResult bindingResult){
        List<User> userList = new ArrayList<>();
        userRepository.findAll().forEach(it -> userList.add(it));
        if (bindingResult.hasErrors()){
            String result = "";
            List<ObjectError> errors = bindingResult.getAllErrors();
            for(ObjectError i : errors){
                String fieldErrors = ((FieldError) i).getField();
                result += (fieldErrors + " - " + i.getDefaultMessage() + "\n");
            }
            return result;
        }
        Optional<User> userResponse = userRepository.findById(user.getId());
        User editUser = userResponse.get();

        for (User tempUser : userRepository.findAll()){
            if (tempUser.getLogin().equals(user.getLogin())){
                if (!tempUser.getLogin().equals(editUser.getLogin()))
                    return "Такой логин уже существует";
            } else if (tempUser.getEmail().equals(user.getEmail())) {
                if (!tempUser.getEmail().equals(editUser.getEmail()))
                    return "Такая почта уже существует";
            }
        }
        editUser.setLogin(user.getLogin());
        editUser.setPassword(user.getPassword());
        editUser.setEmail(user.getEmail());
        editUser.setRole(user.getRole());
        userRepository.save(editUser);
        return "OK";
    }
}