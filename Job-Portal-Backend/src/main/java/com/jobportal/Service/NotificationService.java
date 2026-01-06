package com.jobportal.Service;

import com.jobportal.DTO.NotificationDTO;
import com.jobportal.Exception.JobPortalException;
import com.jobportal.entity.Notification;

import java.util.List;


public interface NotificationService {
    public void sendNotification(NotificationDTO notificationDTO) throws JobPortalException;

    public List<Notification> getUnreadNotifications(Long userId);

    public void readNotifications(Long id) throws JobPortalException;
}
