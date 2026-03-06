package com.jobportal.Controller;

import com.jobportal.DTO.CompanyDTO;
import com.jobportal.Exception.JobPortalException;
import com.jobportal.Service.CompanyService;
import com.jobportal.entity.Company;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/company")
@CrossOrigin(origins = "*")
public class CompanyController {
    @Autowired
    private CompanyService companyService;

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

}
