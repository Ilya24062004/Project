package com.lr5.auto.controller;
import com.lr5.auto.entity.News;
import com.lr5.auto.entity.User;
import com.lr5.auto.repos.NewsRepository;
import com.lr5.auto.repos.UserRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

import java.util.*;

@RestController
public class NewsController {
    private final UserRepository userRepository;
    private final NewsRepository newsRepository;

    public NewsController(UserRepository userRepository, NewsRepository newsRepository) {
        this.userRepository = userRepository;
        this.newsRepository = newsRepository;
    }

    @PostMapping("/get_news")
    public News getNews(@RequestBody Map<String, Long> id){
        Optional<News> newsResponse = newsRepository.findById(id.get("id"));
        News news = newsResponse.get();
        return news;
    }

    @PostMapping("/get_user_news")
    public List<News> user_page(@RequestBody Map<String, String> login) {
        List<News> newsList = new ArrayList<>();
        for (News n : newsRepository.findAll()) {
            if (n.getAuthor().equals(login.get("login"))) {
                newsList.add(n);
            }
        }
        return newsList;
    }

    @GetMapping("/get_all_news")
    public List<News> news_page(){
        List<News> newsList = new ArrayList<>();
        for (News n : newsRepository.findAll()){
            if (n.getStatus().equals("Одобрено"))
                newsList.add(n);
        }
        return newsList;
    }

    @GetMapping("/get_await_news")
    public List<News> await_news(){
        List<News> newsList = new ArrayList<>();
        for (News n : newsRepository.findAll()){
            if (n.getStatus().equals("Ожидание"))
                newsList.add(n);
        }
        return newsList;
    }

    @PostMapping("/add_news")
    public String add_news(@RequestBody HashMap input){
        User user = userRepository.findByLogin(input.get("login").toString());

        News news = new News(
                input.get("login").toString(),
                input.get("theme").toString(),
                input.get("title").toString(),
                input.get("text").toString(),
                input.get("status").toString(),
                user
        );

        if (news.getTheme().equals(""))
            return "Вы не указали тему";

        if (news.getTitle().equals(""))
            return "Вы не указали заголовок";

        if (news.getText().equals(""))
            return "Вы ничего не написали";

        newsRepository.save(news);
        return "ОК";
    }

    @PostMapping("/delete_news")
    @Transactional
    public String delete_news(@RequestBody Map<String, Long> id){
        newsRepository.deleteById(id.get("id"));
        return "OK";
    }

    @PostMapping("/approve_news")
    public String approveNews(@RequestBody Map<String, Long> id){
        Optional<News> newsResponse = newsRepository.findById(id.get("id"));
        News editNews = newsResponse.get();
        editNews.setStatus("Одобрено");
        newsRepository.save(editNews);
        return "OK";
    }

    @PostMapping("/edit")
    public String edit_news(@RequestBody @Valid News news, BindingResult bindingResult){
        List<News> newsList = new ArrayList<>();
        newsRepository.findAll().forEach(it -> newsList.add(it));
        if (bindingResult.hasErrors()){
            String result = "";
            List<ObjectError> errors = bindingResult.getAllErrors();
            for(ObjectError i : errors){
                String fieldErrors = ((FieldError) i).getField();
                result += (fieldErrors + " - " + i.getDefaultMessage() + "\n");
            }
            return result;
        }
        Optional<News> newsResponse = newsRepository.findById(news.getId());
        News editNews = newsResponse.get();
        editNews.setTheme(news.getTheme());
        editNews.setTitle(news.getTitle());
        editNews.setText(news.getText());
        newsRepository.save(editNews);
        return "OK";
    }
}