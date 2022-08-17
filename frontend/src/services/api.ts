import {Configuration, TicketControllerApi} from "../api";

const basePath = "http://localhost:8080"
export const ticketApi = new TicketControllerApi(new Configuration({basePath}));

