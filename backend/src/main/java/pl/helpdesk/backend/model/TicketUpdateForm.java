package pl.helpdesk.backend.model;

import lombok.Data;

@Data
public class TicketUpdateForm {
    String subject;
    Status status;
}
