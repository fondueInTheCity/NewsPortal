package com.spring.server.controller;

import com.spring.server.model.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Created by Юрий on 13.07.2018.
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
    public void onRecievedMessage(Comment comment) {
        this.template.convertAndSend("/chat", comment);
    }
}
