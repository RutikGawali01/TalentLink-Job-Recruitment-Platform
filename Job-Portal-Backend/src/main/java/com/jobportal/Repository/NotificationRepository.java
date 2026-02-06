package com.jobportal.Repository;

import com.jobportal.DTO.NotificationStatus;
import com.jobportal.entity.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface NotificationRepository extends MongoRepository<Notification, Long> {
    //Because Spring Data MongoDB auto-implements repository methods based on method naming conventions.
    public List<Notification> findByUserIdAndStatus(Long userId, NotificationStatus status);
}
