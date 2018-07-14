package com.spring.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Created by Юрий on 13.07.2018.я
 */
@Controller
public class WebSocketController {

    private final SimpMessagingTemplate template;

    @Autowired
    WebSocketController(SimpMessagingTemplate template) {
        this.template = template;
    }

    @MessageMapping("/send/message")
    @ResponseStatus(HttpStatus.OK)
    public void onRecievedMessage(String comment) {
        this.template.convertAndSend("/comment", comment);
    }
}
