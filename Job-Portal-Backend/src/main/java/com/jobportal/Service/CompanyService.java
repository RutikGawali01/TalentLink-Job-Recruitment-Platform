package com.jobportal.Service;

import com.jobportal.DTO.CompanyDTO;
import com.jobportal.Exception.JobPortalException;
import com.jobportal.entity.Company;
import com.jobportal.entity.CompanyJoinRequest;

import java.util.List;
import java.util.Optional;

public interface CompanyService {

    Company save(CompanyDTO dto) throws JobPortalException;

    Optional<Company> getByEmployerId(Long employerId);

    boolean existsByEmployerId(Long employerId);

    List<CompanyJoinRequest> getJoinRequests(Long companyId);

    void approveRequest(Long requestId) throws JobPortalException;

    void rejectRequest(Long requestId);

    Optional<CompanyJoinRequest> getJoinRequestByEmployer(Long employerId);
}
