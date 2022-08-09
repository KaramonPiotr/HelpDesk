package pl.helpdesk.backend.exception;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Builder
@Data
@AllArgsConstructor
public class ApiError {

    private String message;
    private HttpStatus status;
    private LocalDateTime timeStamp;
    
}
