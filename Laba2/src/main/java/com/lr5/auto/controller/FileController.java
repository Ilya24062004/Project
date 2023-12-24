package com.lr5.auto.controller;
import com.lr5.auto.entity.User;
import com.lr5.auto.repos.UserRepository;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@RestController
public class FileController {
    private final UserRepository userRepository;

    public FileController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/file_upload")
    public String uploadImage(@RequestParam MultipartFile file, String login){
        String fileName = file.getOriginalFilename();

        try {
            file.transferTo(new File(
                    "C:\\Users\\Marin\\Downloads\\auto (1)\\auto\\src\\main\\resources\\static\\images" + fileName));
            User user = userRepository.findByLogin(login);

            if (user.getAvatar() != null){
                Files.deleteIfExists(Paths.get("C:\\Users\\Marin\\Downloads\\auto (1)\\auto\\src\\main\\resources\\static\\images"+ user.getAvatar()));
            }
            user.setAvatar(file.getOriginalFilename());
            userRepository.save(user);
        } catch (Exception e){
            return "Ошибка загрузки файла";
        }
        return "Успешно";
    }

    @GetMapping("/get_image")
    @ResponseBody
    public ResponseEntity<byte[]> getImage(@RequestParam String login) throws IOException {
        if(userRepository.findByLogin(login).getAvatar() == null){
            var imgFile = new ClassPathResource("/static/images/user.png");
            byte[] bytes = StreamUtils.copyToByteArray(imgFile.getInputStream());
            return ResponseEntity
                    .ok()
                    .contentType(MediaType.IMAGE_PNG)
                    .body(bytes);
        }else {
            var imgFile = new ClassPathResource("/static/images/" + userRepository.findByLogin(login).getAvatar());
            byte[] bytes = StreamUtils.copyToByteArray(imgFile.getInputStream());

            return ResponseEntity
                    .ok()
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(bytes);
        }
    }
}