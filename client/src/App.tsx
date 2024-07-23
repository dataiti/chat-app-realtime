import { useRoutes } from "react-router-dom";
import { Box } from "@mui/material";
import routers from "~/routes";

function App() {
  const routing = useRoutes(routers);

  return <Box>{routing}</Box>;
}

export default App;
