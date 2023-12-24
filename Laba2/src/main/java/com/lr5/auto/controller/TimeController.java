package com.lr5.auto.controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RestController
public class TimeController {
    @GetMapping("/time")
    public String time(){
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("uuuu/MM/dd HH:mm");
        LocalDateTime localDateTime = LocalDateTime.now();
        return dateTimeFormatter.format(localDateTime);
    }
}