import { useRoutes } from "react-router-dom";
import { Box } from "@mui/material";
import { Toaster } from "react-hot-toast";

import routers from "~/routes";

function App() {
  const routing = useRoutes(routers);

  return (
    <Box>
      {routing} <Toaster />
    </Box>
  );
}

export default App;
