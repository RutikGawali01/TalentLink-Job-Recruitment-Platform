package com.jobportal.Service.ResumeService;

import org.apache.tika.Tika;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.InputStream;

@Service
public class ResumeTextExtractor {

    public String extractText(MultipartFile file) {

        try {

            Tika tika = new Tika();

            return tika.parseToString(file.getInputStream());

        } catch (Exception e) {
            throw new RuntimeException("Resume parsing failed");
        }
    }

    public String extractTextWithTika(byte[] fileBytes) {
        try {
            Tika tika = new Tika();
            return tika.parseToString(new ByteArrayInputStream(fileBytes));
        } catch (Exception e) {
            throw new RuntimeException("Failed to extract text using Tika");
        }
    }

    public String extract(MultipartFile file) {
        try (InputStream is = file.getInputStream()) {
            Tika tika = new Tika();
            return tika.parseToString(is);
        } catch (Exception e) {
            throw new RuntimeException("Extraction failed");
        }
    }

    public String extractFromBytes(byte[] data) {
        try (InputStream is = new ByteArrayInputStream(data)) {
            Tika tika = new Tika();
            return tika.parseToString(is);
        } catch (Exception e) {
            throw new RuntimeException("Extraction failed");
        }
    }
}