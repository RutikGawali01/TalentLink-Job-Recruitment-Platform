package com.jobportal.Service;

import com.jobportal.DTO.CompanyDTO;
import com.jobportal.Exception.JobPortalException;
import com.jobportal.entity.Company;

import java.util.Optional;

public interface CompanyService {

    Company save(CompanyDTO dto) throws JobPortalException;

    Optional<Company> getByEmployerId(Long employerId);

    boolean existsByEmployerId(Long employerId);
}
