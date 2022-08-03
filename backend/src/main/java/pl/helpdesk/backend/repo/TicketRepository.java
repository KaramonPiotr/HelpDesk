package pl.helpdesk.backend.repo;

import org.springframework.data.repository.CrudRepository;


import pl.helpdesk.backend.model.Ticket;

public interface TicketRepository extends CrudRepository<Ticket,String> {
    
}
