package com.jobportal.Config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server; // ✅ CORRECT IMPORT

import io.swagger.v3.oas.models.tags.Tag;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.List;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI myCustomConfig() {
        return new OpenAPI()
                .info(
                        new Info()
                                .title("TalentLink Job Recruiting Platform APIs")
                                .description("By Rutik Gawali")
                                .version("1.0")
                )
                .servers(
                        List.of(
                                new Server().url("http://localhost:9090").description("Local Server 1"),
                                new Server().url("http://localhost:9092").description("Local Server 2")
                        )
                )
                .tags(Arrays.asList(
                        new Tag().name("User APIs"),
                        new Tag().name("Auth Login APIs"),
                        new Tag().name("Applicant-Profile APIs"),
                        new Tag().name("AI Resume APIs"),
                        new Tag().name("Employer-Profile APIs"),
                        new Tag().name("Company APIs"),
                        new Tag().name("Jobs APIs"),
                        new Tag().name("Notifications APIs")
                ))
                .addSecurityItem(new SecurityRequirement().addList("bearerAuth"))
                .components(new Components().addSecuritySchemes(
                        "bearerAuth", new SecurityScheme()
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT")
                                .in(SecurityScheme.In.HEADER)
                                .name("Aithorization")
                ));
    }
}