package com.jobportal.Repository;

import com.jobportal.entity.ResumeAnalysis;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ResumeAnalysisRepository extends MongoRepository<ResumeAnalysis, Long> {

    Optional<ResumeAnalysis> findByUserId(Long userId);
}