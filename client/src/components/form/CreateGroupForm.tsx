import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import SearchBar from "../conversation/contacts/SearchBar";

const CreateGroupForm = () => {
     const {} = useForm();

     return (
          <Box>
               <Box></Box>
               <SearchBar />
          </Box>
     );
};

export default CreateGroupForm;
