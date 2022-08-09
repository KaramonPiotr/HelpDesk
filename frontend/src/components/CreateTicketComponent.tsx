import React, { Component } from 'react'
import { useForm } from '@mantine/form'
import { TextInput, Button, Group, InputBase, Textarea, SegmentedControl } from '@mantine/core';
import { randomId, useSetState } from '@mantine/hooks';
import { Input } from '@mantine/core';
import { IconAt } from '@tabler/icons';
import TicketService from '../services/TicketService';

export default class CreateTicketComponent extends Component {
    state ={
        id: '',
        Subject: '',
        Description: '',
        Priority: '',
        Status: ''
    }
   

    saveTicket = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        let ticket = {
            id: this.state.id, 
            Subject: this.state.Subject, 
            Desription: this.state.Description, 
            Priority: this.state.Priority,
            Status: this.state.Status
        };
        console.log('ticket =>' + JSON.stringify(ticket));
        TicketService.createTicket(ticket);

    }
    
   
    changeSubjectHandler = (event: React.ChangeEvent<HTMLInputElement>)=>{
        this.setState({Subject: event.target.value});
   }
    changeDesriptionHandler = (event: React.ChangeEvent<HTMLInputElement>)=>{
        this.setState({Desription: event.target.value});
   }
   handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event.target.value);
  }
   
    
  render() {
    console.log(this.state.Description)
    console.log(this.state.Subject)
    console.log(this.state.Status)
    return (
    <div>
        <TextInput
        label="Subject"
        placeholder="Type your subject"
        required
        value={this.state.Subject} onChange={this.changeSubjectHandler}
        />
        <TextInput
        label="Description"
        placeholder="Desription"
        required
        value={this.state.Description} onChange={this.changeDesriptionHandler}
        />
        <SegmentedControl
        data={[
        { label: 'LOW', value: 'LOW' },
        { label: 'HIGH', value: 'HIGH' },
        ]}
        onChange={event => console.log("onchange is triggered")}

        />
        <Button  color="green" onClick={this.saveTicket}>
                Add ticket
        </Button>
        
    </div>  
    )
  }
}
