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
    Link,
    useNavigate
} from "react-router-dom";

import { Badge, Box, NavLink } from '@mantine/core';

import { IconHome2, IconPlus, IconChevronRight, IconActivity, IconCircleOff ,IconLockAccess} from '@tabler/icons';



import { SecureRoute, Security, LoginCallback } from '@okta/okta-react';

import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';

import { RequiredAuth } from '../okta/SecureRoute';


//Komponenty
import ListTicketsComponent from './ListTicketsComponent';
import CreateTicketComponent from './CreateTicketComponent';
import TicketDetails from './TicketDetails';
import Protected from './Protected';
import Loading from '../okta/Loading';




function AppShellProject() {

  const oktaAuth = new OktaAuth({
    issuer: 'https://dev-44624176.okta.com/oauth2/default',
    clientId: '0oa68vyup2X3Y97oi5d7',
    redirectUri: 'http://localhost:3000/login/callback'
  });

  
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const navigate = useNavigate();
  const _restoreOriginalUri = (_oktaAuth: any,  originalUri: string) => {
    navigate(toRelativeUrl(originalUri || '/', window.location.origin));
  };


  return (
  <Security oktaAuth={oktaAuth} 
            restoreOriginalUri={oktaAuth.options.restoreOriginalUri|| _restoreOriginalUri}>
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
              <NavLink label="Protected" icon={<IconLockAccess size={16} stroke={1.5} />} component={Link} to="/protected" />
          </Navbar>
        }
 
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
               <Route path='/' element={<ListTicketsComponent/>}></Route>
              <Route path='login/callback' element={<LoginCallback loadingElement={<Loading />} />} />
              <Route path='/protected' element={<RequiredAuth />}>
                  <Route path='' element={<Protected />} />
              </Route>
              <Route path="/add" element = {<CreateTicketComponent/>}></Route>
              <Route path="/tickets/:ticketId"  element = {<TicketDetails/>}></Route>
              
          </Routes>
        </AppShell>
      </Security> 
  );
  
}
export default AppShellProject;

