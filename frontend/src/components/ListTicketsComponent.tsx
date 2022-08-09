import React, { Component } from 'react'
import { Table } from '@mantine/core';
import TicketService from '../services/TicketService';
export default class ListTicketsComponent extends Component {
  
state = {
     tickets: []
}

 componentDidMount(){
    TicketService.getTickets().then((res)=>{
        this.setState({tickets: res.data})
    });
}
  

render() {
    return (
        <div>
          <Table striped>
                    <thead>
                        <tr>
                            <th>Ticket ID</th>
                            <th>Subject</th>
                            <th>Description</th>
                            <th>Priority</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.state.tickets.map(
                                ticket => 
                                <tr key = {ticket['id']}>
                                    <td>{ticket['id']}</td>
                                    <td>{ticket['subject']}</td>
                                    <td>{ticket['descrition']}</td>
                                    <td>{ticket['priority']}</td>
                                    <td>{ticket['status']}</td>

                                </tr>
                            )
                        }
                    </tbody>
                </Table>
        </div>
    )
  }
}
