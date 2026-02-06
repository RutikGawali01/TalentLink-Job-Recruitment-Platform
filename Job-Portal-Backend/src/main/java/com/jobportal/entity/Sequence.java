package com.jobportal.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "sequence")
@Data
public class Sequence {// used for Auto Increments IDs in DB collections
    @Id
    private String id;
    private Long seq;
}
