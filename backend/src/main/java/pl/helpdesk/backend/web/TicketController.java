package pl.helpdesk.backend.web;




import java.time.LocalDateTime;

import javax.validation.Valid;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;


import lombok.AllArgsConstructor;
import pl.helpdesk.backend.exception.ApiError;
import pl.helpdesk.backend.exception.TicketNotFoundException;
import pl.helpdesk.backend.model.Priority;
import pl.helpdesk.backend.model.Status;
import pl.helpdesk.backend.model.Ticket;
import pl.helpdesk.backend.model.TicketUpdateForm;
import pl.helpdesk.backend.repo.TicketRepository;
import pl.helpdesk.backend.service.TicketService;

@AllArgsConstructor
@RestController
@CrossOrigin
public class TicketController implements InitializingBean {

    @Autowired
    TicketRepository ticketRepository;

    @Autowired
    TicketService ticketService;

    @GetMapping("/ticket")
    public ResponseEntity<Iterable<Ticket>> getAll(){
        return ResponseEntity.ok().body( ticketRepository.findAll() );
    }
    
   @GetMapping("/ticket/{id}")
    public ResponseEntity<Ticket> getById(@PathVariable(value = "id") String ticketId){   
            Ticket ticket = ticketRepository.findById(ticketId).orElseThrow(() -> new TicketNotFoundException("Ticket not found for this id :: " + ticketId));
            return ResponseEntity.ok().body(ticket);
    }
    
    @PostMapping("/ticket")
    public Ticket createTicket(@Valid @RequestBody Ticket  newTicket){
        return ticketRepository.save(newTicket);
    }

    @PatchMapping("/ticket/{id}")
    public ResponseEntity<Ticket> updateTicketSubject(@PathVariable String id, @RequestBody TicketUpdateForm ticketUpdateForm) {
            ticketService.update(id, ticketUpdateForm);
            return ResponseEntity.ok().build();
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

    @ExceptionHandler(TicketNotFoundException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiError handelTicketNotFound(TicketNotFoundException ex){
        return ApiError.builder()
        .message("Brak Ticketa")
        .status(HttpStatus.BAD_REQUEST)
        .timeStamp(LocalDateTime.now())
        .build();
    }

}

    

