package com.jobportal.Repository;

import com.jobportal.DTO.MemberStatus;
import com.jobportal.entity.CompanyMember;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface CompanyMemberRepository extends MongoRepository<CompanyMember,Long> {

    Optional<CompanyMember> findByEmployerIdAndCompanyId(Long employerId, Long companyId);


    List<CompanyMember> findByCompanyId(Long companyId);

    Optional<CompanyMember> findByEmployerIdAndStatus(Long employerId, MemberStatus status);

}
