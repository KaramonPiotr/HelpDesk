package pl.helpdesk.backend.web;

import java.util.NoSuchElementException;


import javax.validation.Valid;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


import lombok.AllArgsConstructor;
import pl.helpdesk.backend.model.Priority;
import pl.helpdesk.backend.model.Status;
import pl.helpdesk.backend.model.Ticket;
import pl.helpdesk.backend.repo.TicketRepository;

@AllArgsConstructor
@RestController
public class TicketController implements InitializingBean {

    @Autowired
    TicketRepository ticketRepository;

    @GetMapping("/tickets")
    public ResponseEntity<Iterable<Ticket>> getAll(){
        return ResponseEntity.ok().body( ticketRepository.findAll() );
    }
    
   @GetMapping("/tickets/{id}")
    public ResponseEntity<Ticket> getById(@PathVariable(value = "id") String ticketId)
        throws NoSuchElementException {
            Ticket ticket = ticketRepository.findById(ticketId).orElseThrow(() -> new NoSuchElementException("Employee not found for this id :: " + ticketId));
            return ResponseEntity.ok().body(ticket);
    }
    
    @PostMapping("/tickets")
    public Ticket createTicket(@Valid @RequestBody Ticket  newTicket){
        return ticketRepository.save(newTicket);
    }

    @PatchMapping("/employees/{id}/{subject}")
    public ResponseEntity<Ticket> updateTicketSubject(@PathVariable String id, @PathVariable String subject) {
	try {
		Ticket ticket = ticketRepository.findById(id).get();
		ticket.setSubject(subject);
		return new ResponseEntity<Ticket>(ticketRepository.save(ticket), HttpStatus.OK);
	} catch (Exception e) {
		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
}

    @Override
    public void afterPropertiesSet() throws Exception {
        var ticket = Ticket.builder()
        .subject("Initial ticket: " + System.currentTimeMillis())
        .priority(Priority.HIGH)
        .status(Status.NEW)
        .build();
        ticketRepository.save(ticket);
    }


}

    

