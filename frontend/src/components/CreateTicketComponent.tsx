import React from 'react'
import { useForm } from '@mantine/form'
import { TextInput, Button, Group, Textarea, Box } from '@mantine/core';

import {useNavigate} from "react-router-dom";
import {ticketApi} from "../services/api";


type CreateTicketForm = {
    subject: string,
    description: string,
}
export default function CreateTicketComponent() {

    const navigate = useNavigate()

    const form = useForm<CreateTicketForm>({
        initialValues: {
            subject: '',
            description: '',
        },

        validate: {
            subject: value => !!value && value.length > 3 ? null : 'Subject must contain at least 3 chars',
            description: value => !!value && value.length > 3 ? null : 'Description must contain at least 3 chars'
        },
    });

    function onFormSubmit(values: CreateTicketForm) {
        ticketApi.createTicket(values).then(value => {
            navigate("/")
        });
    }

    return (
        <Box sx={{ maxWidth: 300 }} mx="auto">
            <form onSubmit={form.onSubmit(onFormSubmit)}>
                <TextInput
                    required
                    label="Subject"
                    placeholder="Type in subject"
                    {...form.getInputProps('subject')}
                />
                <Textarea
                    required
                    label="Description"
                    placeholder="Type in subject"
                    {...form.getInputProps('description')}
                />
                <Group position="right" mt="md">
                    <Button type="submit">Submit</Button>
                </Group>
            </form>
        </Box>
    )

}
