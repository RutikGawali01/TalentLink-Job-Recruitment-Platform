package com.jobportal.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jobportal.DTO.AccountType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data


@Document(collection = "users" )
@NoArgsConstructor

@AllArgsConstructor
public class User {
    @Id
    private Long id;

//    @NotBlank(message = "name is null or blank")
    private  String name;

    @Indexed(unique = true)
    private String email;

    @JsonIgnore
    private String password;
    private AccountType accountType;
    private boolean emailVerified;

    private Long profileId;

    //private boolean profileCompleted;   // default false
    private Long companyId;

    private LocalDateTime createdAt;

        private String status;


    private Integer onboardingStep = 1;




    // no need of this bcz model mapper is used
//    public UserDTO toDTO(){
//        return new UserDTO(this.id, this.name, this.email, this.password, this.accountType);
//    }


}
