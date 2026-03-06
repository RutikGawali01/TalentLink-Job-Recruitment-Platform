package com.jobportal.Service;

import com.jobportal.DTO.AccountType;
import com.jobportal.DTO.CompanyDTO;
import com.jobportal.Exception.JobPortalException;
import com.jobportal.Repository.CompanyRepository;
import com.jobportal.Repository.UserRepository;
import com.jobportal.entity.Company;
import com.jobportal.entity.User;
import com.jobportal.utility.Utilities;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CompanyServiceImpl implements CompanyService {

    private final CompanyRepository companyRepository;
    private final Utilities utilities;

    private final UserRepository userRepository;


    // ================= SAVE (CREATE / UPDATE) =================
    @Override
    public Company save(CompanyDTO dto) throws JobPortalException {

        Company company;

        // ===== CASE 1 — UPDATE by ID =====
        if (dto.getId() != null && companyRepository.existsById(dto.getId())) {
            company = companyRepository.findById(dto.getId())
                    .orElseThrow(() -> new RuntimeException("Company not found"));
        }

        // ===== CASE 2 — UPDATE by employerId =====
        else if (companyRepository.existsByEmployerId(dto.getEmployerId())) {
            company = companyRepository.findByEmployerId(dto.getEmployerId())
                    .orElseThrow(() -> new RuntimeException("Company not found"));
        }

        // ===== CASE 3 — CREATE =====
        else {
            company = new Company();
            Long nextId = utilities.getNextSequence("company");
            company.setId(nextId);
        }

        // ---------- Mapping ----------
        company.setName(dto.getName());
        company.setTagline(dto.getTagline());
        company.setIndustry(dto.getIndustry());
        company.setLocation(dto.getLocation());
        company.setAbout(dto.getAbout());

        company.setCompanyType(dto.getCompanyType());
        company.setCompanySize(dto.getCompanySize());
        company.setWorkModel(dto.getWorkModel());

        company.setWebsite(dto.getWebsite());
        company.setFoundedYear(dto.getFoundedYear());
        company.setEmployerId(dto.getEmployerId());

        if (dto.getLogo() != null && !dto.getLogo().isEmpty()) {
            company.setLogo(dto.toEntity().getLogo());
        }

        company.setProfileCompleted(true);


        if(companyRepository.existsByName(company.getName())){
            throw new RuntimeException("Company already exists");
        }

        Company saved = companyRepository.save(company);
        System.out.println("COMPANY SAVED IN DB: " + saved);

        // =====================================================
        // 🔥 UPDATE USER TABLE (Onboarding + Company Mapping)
        // =====================================================

        User user = userRepository.findByProfileId(saved.getEmployerId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Set companyId if not already set
        if (user.getCompanyId() == null) {
            user.setCompanyId(saved.getId());
        }

        // Move onboarding step → 3 (Employer only)
        if (user.getAccountType() == AccountType.EMPLOYER) {

            Integer currentStep = user.getOnboardingStep();

            // Only move forward, never backward
            if (currentStep == null || currentStep < 3) {
                user.setOnboardingStep(3);   // STEP 3 → Post First Job
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
}
