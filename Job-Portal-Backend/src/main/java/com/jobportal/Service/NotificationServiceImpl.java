package com.jobportal.Service;

import com.jobportal.DTO.NotificationDTO;
import com.jobportal.DTO.NotificationStatus;
import com.jobportal.Exception.JobPortalException;
import com.jobportal.Repository.NotificationRepository;
import com.jobportal.entity.Notification;
import com.jobportal.utility.Utilities;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service("notificationService")
public class NotificationServiceImpl implements NotificationService{
    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    @Async
    public void sendNotification(NotificationDTO notificationDTO) throws JobPortalException {
        notificationDTO.setId(Utilities.getNextSequence("notification"));
        notificationDTO.setStatus(NotificationStatus.UNREAD);
        notificationDTO.setTimeStamp(LocalDateTime.now());
        notificationRepository.save(modelMapper.map(notificationDTO, Notification.class));
    }

    @Override
    public List<Notification> getUnreadNotifications(Long userId) {
        return notificationRepository.findByUserIdAndStatus(userId, NotificationStatus.UNREAD );
    }

    @Override
    public void readNotifications(Long id) throws JobPortalException {
        Notification notification = notificationRepository.findById(id).orElseThrow(()->
                new JobPortalException("No Notification found"));
        notification.setStatus(NotificationStatus.READ);
        notificationRepository.save(notification);
    }
}
