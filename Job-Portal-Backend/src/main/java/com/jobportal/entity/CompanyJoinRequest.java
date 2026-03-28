package com.jobportal.entity;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "company_join_requests")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CompanyJoinRequest {

    @Id
    private Long id;

    private Long employerId;

    private Long companyId;

    private String status; // PENDING / APPROVED / REJECTED

    private long createdAt;
}