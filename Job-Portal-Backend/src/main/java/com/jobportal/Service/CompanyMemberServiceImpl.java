package com.jobportal.Service;

import com.jobportal.DTO.MemberStatus;
import com.jobportal.Repository.CompanyMemberRepository;
import com.jobportal.entity.CompanyMember;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CompanyMemberServiceImpl implements CompanyMemberService {

    private final CompanyMemberRepository companyMemberRepository;

    @Override
    public Optional<CompanyMember> getApprovedMember(Long employerId) {

        return companyMemberRepository
                .findByEmployerIdAndStatus(employerId, MemberStatus.ACTIVE);

    }
}