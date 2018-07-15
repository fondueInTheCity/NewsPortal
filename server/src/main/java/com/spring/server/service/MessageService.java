package com.spring.server.service;

import org.springframework.stereotype.Service;

@Service
public class MessageService {

    public String activationCode(String username, String code) {
        return String.format(
                "Hallo, %s \n" +
                        "Welcome to ItNews! Please, visit next link: http://localhost:4200/auth/activate/%s",
                username, code);
    }

    public String rememberPassword(String username, String password) {
        return String.format( "Hallo, %s \n" + "It is your password %s", username, password);
    }

    public String activationCodeChangePassword(String username, String code) {
        return String.format("Hallo, %s \n" + "It is confirm on change password http://localhost:4200/restore/%s",
                username, code);
    }
}
