package com.jobportal.Controller;

import com.jobportal.DTO.CompanyDTO;
import com.jobportal.DTO.JoinRequestStatusDTO;
import com.jobportal.DTO.MemberStatus;
import com.jobportal.Exception.JobPortalException;
import com.jobportal.Service.CompanyMemberService;
import com.jobportal.Service.CompanyService;
import com.jobportal.entity.Company;
import com.jobportal.entity.CompanyJoinRequest;
import com.jobportal.entity.CompanyMember;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/company")
@CrossOrigin(origins = "*")
@Tag(name = "Company APIs")
public class CompanyController {
    @Autowired
    private CompanyService companyService;

    @Autowired
    private CompanyMemberService companyMemberService;


    @PostMapping("/create")
    public Company createCompany(@RequestBody CompanyDTO company) throws JobPortalException {
        return companyService.save(company);
    }

    @PutMapping("/update/{id}")
    public Company updateCompany(@PathVariable Long id,
                                 @RequestBody CompanyDTO company) throws JobPortalException {
        company.setId(id);
        return companyService.save(company);
    }

    @GetMapping("/employer/{employerId}")
    public ResponseEntity<CompanyDTO> getByEmployer(@PathVariable Long employerId) {
        return companyService.getByEmployerId(employerId)
                .map(company -> ResponseEntity.ok(company.toDTO()))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/join-requests/{companyId}")
    public List<CompanyJoinRequest> getJoinRequests(
            @PathVariable Long companyId) {

        return companyService.getJoinRequests(companyId);
    }

    // ================= APPROVE REQUEST =================

    @PostMapping("/approve-request/{requestId}")
    public ResponseEntity<String> approveRequest(
            @PathVariable Long requestId) throws JobPortalException {

        companyService.approveRequest(requestId);

        return ResponseEntity.ok("Recruiter approved successfully");
    }

    // ================= REJECT REQUEST =================

    @PostMapping("/reject-request/{requestId}")
    public ResponseEntity<String> rejectRequest(
            @PathVariable Long requestId) {

        companyService.rejectRequest(requestId);

        return ResponseEntity.ok("Recruiter request rejected");
    }


    @GetMapping("/member/{employerId}")
    public ResponseEntity<CompanyMember> getCompanyMember(@PathVariable Long employerId) {

        Optional<CompanyMember> member = companyMemberService.getApprovedMember(employerId);

        return member
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.noContent().build());

    }

    @GetMapping("/request-status/{employerId}")
    public ResponseEntity<?> checkRequestStatus(
            @PathVariable Long employerId) {

        if (employerId == null) {
            return ResponseEntity.badRequest().body("EmployerId required");
        }

        Optional<CompanyJoinRequest> request =
                companyService.getJoinRequestByEmployer(employerId);

        if (request.isEmpty()) {
            return ResponseEntity.ok(
                    new JoinRequestStatusDTO("NONE", null)
            );
        }

        CompanyJoinRequest req = request.get();

        return ResponseEntity.ok(
                new JoinRequestStatusDTO(
                        req.getStatus(),
                        req.getCompanyId()
                )
        );
    }
}
