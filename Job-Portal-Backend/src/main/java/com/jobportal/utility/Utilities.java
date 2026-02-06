package com.jobportal.utility;

import com.jobportal.Exception.JobPortalException;
import com.jobportal.entity.Sequence;
import jdk.jshell.execution.Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;

import java.security.SecureRandom;


@Component
public class Utilities {


    private static MongoOperations mongoOperations;

    @Autowired
    public void setMongoOperations(MongoOperations mongoOperations){
        Utilities.mongoOperations = mongoOperations;
    }

    //Auto-increment sequence generation in MongoDB
    public static Long getNextSequence(String key) throws JobPortalException {

        Query query = new Query(Criteria.where("_id").is(key));

        Update update = new Update().inc("seq", 1);

        FindAndModifyOptions options = new FindAndModifyOptions()
                .returnNew(true)   // return updated value
                .upsert(true);     // create document if not exists

        Sequence sequence = mongoOperations.findAndModify(
                query,
                update,
                options,
                Sequence.class
        );

        if (sequence == null) {
            throw new JobPortalException("Unable to generate sequence for key: " + key);
        }

        return sequence.getSeq();
    }


    //✅ OTP generation
    public static String  generateOTP(){
        StringBuilder otp = new StringBuilder();
        SecureRandom random = new SecureRandom();
        for(int i= 0; i<6; i++){
            otp.append(random.nextInt(10));
        }
        return otp.toString();
    }


}
