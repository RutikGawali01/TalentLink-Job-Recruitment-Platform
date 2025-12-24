package com.jobportal.entity;

import com.jobportal.DTO.AccountType;
import com.jobportal.DTO.UserDTO;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.lang.annotation.Documented;

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

    private String password;
    private AccountType accountType;


    // no need of this bcz model mapper is used
//    public UserDTO toDTO(){
//        return new UserDTO(this.id, this.name, this.email, this.password, this.accountType);
//    }


}
