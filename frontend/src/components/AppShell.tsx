import React from 'react'
import { useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Switch,
} from '@mantine/core';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { Badge, Box, NavLink } from '@mantine/core';
import { IconHome2, IconPlus, IconChevronRight, IconActivity, IconCircleOff } from '@tabler/icons';

import ListTicketsComponent from './ListTicketsComponent';
import CreateTicketComponent from './CreateTicketComponent';
import TicketDetails from './TicketDetails';
import Login from '.okta/Login'


function onAuthRequired({history}){
  history.push('login');
}

function AppShellProject() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
<Router>
  <Security
    issuer = 'https://dev-44624176.okta.com/oauth2/default'
    client_id = '0oa68vyup2X3Y97oi5d7'
    redirect_uri={window.location.origin + 'implicit/callback'}
    onAuthRequired={onAuthRequired}> 
      <AppShell
        styles={{
          main: {
            background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        navbar={
          <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
              <NavLink label="Tickets" icon={<IconHome2 size={16} stroke={1.5} />} component={Link} to="/" />
              <NavLink label="New ticket" icon={<IconPlus size={16} stroke={1.5} />} component={Link} to="/add" />
          </Navbar>
        }
      //   aside={
      //     <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
      //       <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
      //         <Text>Application sidebar</Text>
      //       </Aside>
      //     </MediaQuery>
      //   }
        footer={
          <Footer height={60} p="md">
            Application footer
          </Footer>
        }
        header={
          <Header height={70} p="md">
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>

              <Text>Helpdesk</Text>
            </div>
          </Header>
        }
      >
          <Routes>
              <Route path="/" element = {<ListTicketsComponent/>}></Route>
              <Route path="/add" element = {<CreateTicketComponent/>}></Route>
              <SecureRoute path="/tickets/:ticketId"  element = {<TicketDetails/>}></SecureRoute>
              <Route path="/login" render = {() => <Login baseURL = "https://dev-44624176.okta.com/oauth2/default"/>} ></Route>
              <Route path="/implicity/callback" component = {ImplicityCallback} ></Route>
          </Routes>
        </AppShell>
      </Security> 
    </Router>
  );
  
}
export default AppShellProject;

