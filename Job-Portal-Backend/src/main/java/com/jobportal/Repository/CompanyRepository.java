package com.jobportal.Repository;

import com.jobportal.entity.Company;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface CompanyRepository extends MongoRepository<Company, Long> {

    Optional<Company> findByEmployerId(Long employerId);

    boolean existsByEmployerId(Long employerId);

    boolean existsByName(String companyName);

    Optional<Company> findByDomain(String domain);



}
