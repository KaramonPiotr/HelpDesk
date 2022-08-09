import axios from 'axios';

const TICKET_API_BASE_URL = "http://localhost:8080/ticket";

class TicketService{
    getTickets(){
        return axios.get(TICKET_API_BASE_URL);
    }
    createTicket(ticket: any){
        return axios.post(TICKET_API_BASE_URL, ticket);
    }
}

export default new TicketService()