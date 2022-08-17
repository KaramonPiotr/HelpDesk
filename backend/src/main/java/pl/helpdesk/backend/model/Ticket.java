package pl.helpdesk.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Document("tickets")
public class Ticket {
    @Id
    String id;
    String subject;
    String description;
    Priority priority;
    Status status;


}
