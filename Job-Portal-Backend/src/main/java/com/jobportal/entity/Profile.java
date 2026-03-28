    package com.jobportal.entity;

    import com.jobportal.DTO.*;
    import lombok.AllArgsConstructor;
    import lombok.Data;
    import lombok.NoArgsConstructor;
    import lombok.RequiredArgsConstructor;
    import org.springframework.data.annotation.Id;
    import org.springframework.data.mongodb.core.mapping.Document;

    import java.util.Base64;
    import java.util.List;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    // applicant profile
    @Document(collection = "profiles")
    public class Profile {

        @Id
        private Long id;
        private Long userId;
        private String name;
        private String email;
        private String headline;

        private String location;
        private String about;

        private byte[] picture;    // Stored in DB as byte[]
        private byte[] banner;
        private byte[] resume;
        private String resumeName;
        private String resumeUploadDate;
        private Long totalExp;

        private List<String> skills;
        private List<Experience> experiences;
        private List<Certification> certifications;
        private List<Education> educations;

        private List<Long> savedJobs;
        private Portfolio portfolio;


        private Boolean profileCompleted = false;
        private Boolean resumeUploaded = false;

        public ProfileDTO toDTO() {
            return new ProfileDTO(
                    id,
                    userId,
                    name,
                    email,
                    headline,
                    location,
                    about,
                    picture!=null ? Base64.getEncoder().encodeToString(picture) : null,
                    banner!=null ? Base64.getEncoder().encodeToString(banner) : null,
                    resume!=null ? Base64.getEncoder().encodeToString(resume) : null,
                    resumeName,
                    resumeUploadDate,
                    totalExp,
                    skills,
                    experiences,
                    certifications,
                    educations,
                    savedJobs,
                    portfolio,
                    profileCompleted,resumeUploaded
            );
        }
    }
