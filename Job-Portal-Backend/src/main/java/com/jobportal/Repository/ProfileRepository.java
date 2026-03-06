package com.jobportal.Repository;

import com.jobportal.entity.Profile;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ProfileRepository extends MongoRepository<Profile, Long> {

    Optional<Profile> findByUserId(Long userId);

}
