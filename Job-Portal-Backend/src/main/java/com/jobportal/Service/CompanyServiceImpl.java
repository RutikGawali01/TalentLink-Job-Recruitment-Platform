    package com.jobportal.Service;

    import com.jobportal.DTO.*;
    import com.jobportal.Exception.JobPortalException;
    import com.jobportal.Repository.*;
    import com.jobportal.entity.*;
    import com.jobportal.utility.Utilities;
    import lombok.RequiredArgsConstructor;
    import org.springframework.stereotype.Service;

    import java.time.LocalDateTime;
    import java.util.List;
    import java.util.Optional;

    @Service
    @RequiredArgsConstructor
    public class CompanyServiceImpl implements CompanyService {

        private final CompanyRepository companyRepository;
        private final Utilities utilities;

        private final UserRepository userRepository;
        private final CompanyMemberRepository companyMemberRepository;
        private final CompanyJoinRequestRepository joinRequestRepository;
        private final EmployerProfileRepository employerProfileRepository;
        private final CompanyJoinRequestRepository companyJoinRequestRepository;

        // ================= SAVE (CREATE / UPDATE) =================
        @Override
        public Company save(CompanyDTO dto) throws JobPortalException {


            // CASE 1: UPDATE EXISTING COMPANY PROFILE
            if (dto.getId() != null && companyRepository.existsById(dto.getId())) {


                Company company = companyRepository.findById(dto.getId())
                        .orElseThrow(() -> new RuntimeException("Company not found"));

                company.setName(dto.getName());
                company.setTagline(dto.getTagline());
                company.setIndustry(dto.getIndustry());
                company.setLocation(dto.getLocation());
                company.setAbout(dto.getAbout());

                company.setCompanyType(dto.getCompanyType());
                company.setCompanySize(dto.getCompanySize());
                company.setWorkModel(dto.getWorkModel());

                company.setWebsite(dto.getWebsite());
                company.setEmail(dto.getEmail());
                company.setFoundedYear(dto.getFoundedYear());

                if (dto.getLogo() != null && !dto.getLogo().isEmpty()) {
                    company.setLogo(dto.toEntity().getLogo());
                }

                company.setProfileCompleted(true);

                Company savedCompany = companyRepository.save(company);

                System.out.println("Company updated successfully: " + savedCompany.getId());

                return savedCompany;
            }

            // =========================================================
            // CASE 2: CLAIM / CREATE COMPANY
            // =========================================================

            String domain = utilities.extractDomain(dto.getWebsite());

            Optional<Company> existingCompany = companyRepository.findByDomain(domain);

            // =========================================================
            // CASE 2A: COMPANY ALREADY EXISTS
            // =========================================================
            if (existingCompany.isPresent()) {

                Company company = existingCompany.get();


                // Check if employer already belongs to company
                Optional<CompanyMember> existingMember =
                        companyMemberRepository.findByEmployerIdAndCompanyId(
                                dto.getEmployerId(),
                                company.getId()
                        );

                if (existingMember.isPresent()) {
                    throw new JobPortalException("You already belong to this company.");
                }

                // Check if join request already exists
                Optional<CompanyJoinRequest> existingRequest =
                        joinRequestRepository.findByEmployerId(dto.getEmployerId());

                if (existingRequest.isPresent()) {
                    throw new JobPortalException("Join request already sent.");
                }

                // Create join request
                CompanyJoinRequest request = CompanyJoinRequest.builder()
                        .id(Utilities.getNextSequence("companyJoinRequest"))
                        .employerId(dto.getEmployerId())
                        .companyId(company.getId())
                        .status("PENDING")
                        .createdAt(System.currentTimeMillis())
                        .build();

                joinRequestRepository.save(request);

                throw new JobPortalException(
                        "Company already exists. Join request sent to company admin."
                );
            }
            // CASE 2B: CREATE NEW COMPANY
            Company company = new Company();

            Long nextId = utilities.getNextSequence("company");
            company.setId(nextId);

            company.setName(dto.getName());
            company.setWebsite(dto.getWebsite());
            company.setDomain(domain);
            company.setEmail(dto.getEmail());
            company.setEmployerId(dto.getEmployerId());

            company.setCreated_at(LocalDateTime.now());
            company.setVerified(false);
            company.setProfileCompleted(false);

            Company saved = companyRepository.save(company);

            System.out.println("Company created with id: " + saved.getId());
            // CREATE COMPANY ADMIN

            CompanyMember admin = CompanyMember.builder()
                    .id(Utilities.getNextSequence("companyMember"))
                    .employerId(dto.getEmployerId())
                    .companyId(saved.getId())
                    .role(CompanyRoles.ADMIN)
                    .status(MemberStatus.ACTIVE)
                    .joinedAt(System.currentTimeMillis())
                    .build();

            companyMemberRepository.save(admin);

            System.out.println("Admin member created for employer: " + dto.getEmployerId());

            // UPDATE USER TABLE

            User user = userRepository.findByProfileId(saved.getEmployerId())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            if (user.getCompanyId() == null) {
                user.setCompanyId(saved.getId());
            }

            // UPDATE EMPLOYER PROFILE

            EmployerProfile employerProfile = employerProfileRepository
                    .findById(dto.getEmployerId())
                    .orElseThrow(() -> new RuntimeException("Employer profile not found"));

            if (employerProfile.getCompanyId() == null) {
                employerProfile.setCompanyId(saved.getId());
            }

            employerProfileRepository.save(employerProfile);
            // UPDATE ONBOARDING STEP

            if (user.getAccountType() == AccountType.EMPLOYER) {

                Integer currentStep = user.getOnboardingStep();
                if (currentStep == null || currentStep < 3) {
                    user.setOnboardingStep(3);
                }
            }

            userRepository.save(user);

            return saved;
        }


        // ================= GET COMPANY BY EMPLOYER =================
        @Override
        public Optional<Company> getByEmployerId(Long employerId) {
            return companyRepository.findByEmployerId(employerId);
        }



        // ================= CHECK COMPANY EXISTS =================
        @Override
        public boolean existsByEmployerId(Long employerId) {
            return companyRepository.existsByEmployerId(employerId);
        }


        @Override
        public List<CompanyJoinRequest> getJoinRequests(Long companyId) {
            return joinRequestRepository.findByCompanyIdAndStatus(companyId, "PENDING");
        }

        @Override
        public void approveRequest(Long requestId) throws JobPortalException {

            CompanyJoinRequest request = joinRequestRepository.findById(requestId)
                    .orElseThrow(() -> new RuntimeException("Join request not found"));

            // update request status
            request.setStatus("APPROVED");
            joinRequestRepository.save(request);

            // create company member
            CompanyMember member = CompanyMember.builder()
                    .id(Utilities.getNextSequence("CompanyMember"))
                    .employerId(request.getEmployerId())
                    .companyId(request.getCompanyId())
                    .role(CompanyRoles.RECRUITER)
                    .status(MemberStatus.ACTIVE)
                    .joinedAt(System.currentTimeMillis())
                    .build();

            companyMemberRepository.save(member);
        }

        @Override
        public void rejectRequest(Long requestId) {

            CompanyJoinRequest request = joinRequestRepository.findById(requestId)
                    .orElseThrow(() -> new RuntimeException("Join request not found"));

            request.setStatus("REJECTED");

            joinRequestRepository.save(request);
        }


        public Optional<CompanyJoinRequest> getJoinRequestByEmployer(Long employerId) {
            return companyJoinRequestRepository.findByEmployerId(employerId);
        }

    }
