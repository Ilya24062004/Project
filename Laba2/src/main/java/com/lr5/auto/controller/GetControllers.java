package com.lr5.auto.controller;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class GetControllers {
    @GetMapping("/")
    public String enter(Model model){
        return "enter_page";
    }

    @GetMapping("/registration_page")
    public String registration(Model model){
        return "registration_page";
    }

    @GetMapping("/news_page")
    public String news(Model model){
        return "news_page";
    }

    @GetMapping("/news_page2")
    public String admin_news_page(Model model) {
        return "news_page2";
    }

    @GetMapping("/user_page")
    public String user_page(Model model){
        return "user_page";
    }

    @GetMapping("/user_page2")
    public String admin_user_page(Model model){
        return "user_page2";
    }

    @GetMapping("/admin_page")
    public String admin_page(Model model){
        return "admin_page";
    }

    @GetMapping("/moder_news_page")
    public String moder_news_page(Model model){
        return "moder_news_page";
    }

    @GetMapping("/moder_page")
    public String moder_page(Model model){
        return "moder_page";
    }
}