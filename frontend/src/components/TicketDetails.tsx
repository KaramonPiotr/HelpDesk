import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import TicketService from '../services/TicketService';
import { Ticket } from '../api';
import { Paper } from '@mantine/core';
import { Text } from '@mantine/core';



export default function TicketDetails() {

    const ticketId = JSON.stringify(useParams()).substr(13,24);
    const [ticket, setTicket] = useState([])

    console.log(ticketId)

    const getTicket = async () =>{
    TicketService.getTicketById(ticketId).then(res => {
        console.log(res.data)
        setTicket(Object.values(res.data))
        console.log(ticket)
    })};
    
    useEffect(() => {
        getTicket();
    }, [])

  return (
   <div>
       <Paper shadow="xs" p="md">
            <Text weight={700} size="xl">Ticekt Id</Text>
            <Text>
                {ticket[0]}
            </Text>
        </Paper>
        <Paper shadow="xs" p="md">
            <Text weight={700} size="xl">Ticekt Subject</Text>
            <Text>
                {ticket[1]}
            </Text>
        </Paper>
        <Paper shadow="xs" p="md">
            <Text weight={700} size="xl">Ticekt Description</Text>
            <Text>
                {ticket[2]}
            </Text>
        </Paper>
        <Paper shadow="xs" p="md">
            <Text weight={700} size="xl">Ticekt Priority</Text>
            <Text>
                {ticket[3]}
            </Text>
        </Paper>
        <Paper shadow="xs" p="md">
            <Text weight={700} size="xl">Ticekt Status</Text>
            <Text>
                {ticket[4]}
            </Text>
        </Paper>
        
   </div>

  )
}
