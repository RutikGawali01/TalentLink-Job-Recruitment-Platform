package com.jobportal.entity;
import com.jobportal.DTO.CompanyRoles;
import com.jobportal.DTO.MemberStatus;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "company_members")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CompanyMember {

    @Id
    private Long id;

    private Long employerId;

    private Long companyId;

    private CompanyRoles role; // ADMIN / HR / RECRUITER


    private MemberStatus status; // ACTIVE / PENDING / REJECTED

    private long joinedAt;
}