package com.jobportal.Repository;

import com.jobportal.entity.Analysis;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface AnalysisRepository extends MongoRepository<Analysis, Long> {

    Optional<Analysis> findByUserIdAndJobId(Long userId, Long jobId);
}
