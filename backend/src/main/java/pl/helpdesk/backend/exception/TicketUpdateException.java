package pl.helpdesk.backend.exception;

public class TicketUpdateException extends RuntimeException {
    public TicketUpdateException(String message){
        super(message);
    }

    public TicketUpdateException(String msg, RuntimeException e) {
        super(msg, e);
    }
}
