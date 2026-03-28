package com.jobportal.Service;

import com.jobportal.entity.CompanyMember;

import java.util.Optional;

public interface CompanyMemberService {

    Optional<CompanyMember> getApprovedMember(Long employerId);
}
