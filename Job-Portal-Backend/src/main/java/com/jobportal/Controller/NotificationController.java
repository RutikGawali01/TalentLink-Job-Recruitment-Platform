package com.jobportal.Controller;

import com.jobportal.DTO.ResponseDTO;
import com.jobportal.Exception.JobPortalException;
import com.jobportal.Service.NotificationService;
import com.jobportal.entity.Notification;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notification")
@CrossOrigin(origins = "*")
@Validated
@Tag(name = "Notifications APIs")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @GetMapping("/get/{userId}")
    public ResponseEntity<List<Notification>> getNotification(@PathVariable Long userId ){
        return  new ResponseEntity<>(notificationService.getUnreadNotifications(userId), HttpStatus.OK);
    }

    @PutMapping("/read/{id}")
    public ResponseEntity<ResponseDTO> readNotification(@PathVariable Long id ) throws JobPortalException {
        notificationService.readNotifications(id);
        return  new ResponseEntity<>(new ResponseDTO("Success"), HttpStatus.OK);
    }

}
