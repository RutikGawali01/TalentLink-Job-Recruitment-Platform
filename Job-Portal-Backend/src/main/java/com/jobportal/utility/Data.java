package com.jobportal.utility;

public class Data {

    // OTP messaage in email
    public static String getMessage(String OTP, String userName) {
        return
                "<!DOCTYPE html>\n" +
                        "<html>\n" +
                        "<head>\n" +
                        "    <meta charset='UTF-8'>\n" +
                        "    <title>OTP Verification</title>\n" +
                        "    <style>\n" +
                        "        .container { width: 100%; background-color: #f6f6f6; padding: 20px 0; font-family: Arial, sans-serif; }\n" +
                        "        .box { background-color: #ffffff; max-width: 450px; margin: auto; padding: 25px; border-radius: 8px; text-align: center; border: 1px solid #e0e0e0; }\n" +
                        "        .otp { font-size: 30px; font-weight: bold; letter-spacing: 4px; background:#f2f2f2; padding:10px; border-radius:5px; display:inline-block; margin-top:10px; }\n" +
                        "        .footer { font-size: 12px; color: #888; margin-top: 20px; }\n" +
                        "        a { color:#00aaff; text-decoration:none; }\n" +
                        "    </style>\n" +
                        "</head>\n" +
                        "<body>\n" +
                        "    <div class='container'>\n" +
                        "        <div class='box'>\n" +
                        "            <h2>OTP Verification</h2>\n" +
                        "            <p>Hello, "+userName+"</p>\n" +
                        "            <p>Use the OTP below to complete your verification process.</p>\n" +
                        "\n" +
                        "            <div class='otp'>" + OTP + "</div>\n" +
                        "\n" +
                        "            <p>This OTP is valid only for <b>10 minutes</b>. Please do not share it with anyone.</p><br>\n" +
                        "            <p>If you did not request this, please ignore this email.</p>\n" +
                        "            <div class='footer'>\n" +
                        "                <p>© 2025 Job Portal</p>\n" +
                        "                <p><a href='#'>Contact Support</a></p>\n" +
                        "            </div>\n" +
                        "        </div>\n" +
                        "    </div>\n" +
                        "</body>\n" +
                        "</html>";
    }
}
