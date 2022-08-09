
import { ColorScheme, ColorSchemeProvider, MantineProvider, Paper } from "@mantine/core";
import "./App.css";
import AppShellProject from "./components/AppShell";

function App() {
return (
    <div>
          <MantineProvider>
            <AppShellProject></AppShellProject>
          </MantineProvider>
   </div>
  );
}

export default App;
