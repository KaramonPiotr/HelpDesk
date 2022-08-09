package pl.helpdesk.backend.service;

import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import pl.helpdesk.backend.exception.TicketNotFoundException;
import pl.helpdesk.backend.exception.TicketUpdateException;
import pl.helpdesk.backend.model.TicketUpdateForm;
import pl.helpdesk.backend.repo.TicketRepository;

@Service
@AllArgsConstructor
@Slf4j
public class TicketService {
    @Autowired
    TicketRepository ticketRepository;


    public void update(@NotNull String ticketId, TicketUpdateForm ticketUpdateForm) {
        try {
            var ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new TicketNotFoundException("Nie ma")); 
            ticket.setSubject(ticketUpdateForm.getSubject());
            ticket.setStatus(ticketUpdateForm.getStatus());
            ticketRepository.save(ticket);
        } catch (RuntimeException e) {
            var msg = "Problem podczas updejtu ticketa {}".formatted(ticketId);
            log.error(msg, e);
            throw new TicketUpdateException(msg, e);
        }
            
    }
}
