package com.jobportal.Repository;

import com.jobportal.entity.EmployerProfile;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface EmployerProfileRepository extends MongoRepository<EmployerProfile, Long> {

    Optional<EmployerProfile> findById(Long id);


}
