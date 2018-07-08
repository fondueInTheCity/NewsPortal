package com.spring.server.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;

import java.util.logging.Logger;

@Component
@RequiredArgsConstructor
public class WebSocketController {

    private static final Logger LOGGER = Logger.getLogger(WebSocketController.class.getName());
    private final SimpMessagingTemplate template;
    int time = 10;

    public void publishWebSocket(String data){
        LOGGER.info("Publis the result : " + data);
        template.convertAndSend("/topic/hello", data);
    }
}
