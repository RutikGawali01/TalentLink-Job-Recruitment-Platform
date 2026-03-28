package com.jobportal.Repository;


import com.jobportal.entity.CompanyJoinRequest;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface CompanyJoinRequestRepository extends MongoRepository<CompanyJoinRequest,Long> {

    List<CompanyJoinRequest> findByCompanyIdAndStatus(Long companyId, String status);

    Optional<CompanyJoinRequest> findByEmployerId(Long employerId);
}
