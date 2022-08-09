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
import ListTicketsComponent from './ListTicketsComponent';
import CreateTicketComponent from './CreateTicketComponent';

function AppShellProject() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
<Router>  
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
          <div style={{display:"flex", flexDirection: "column"}}>
                <Text component={Link} variant="link" to="/">
                    List Tickets
                </Text>
                <Text component={Link} variant="link" to="/add">
                    Add Ticket
                </Text>
          </div>
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
        </Routes>
    </AppShell>
    </Router>
  );
  
}
export default AppShellProject;
