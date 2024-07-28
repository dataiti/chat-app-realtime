import { memo, ReactNode } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

interface BaseModalProps {
     children: ReactNode;
     open: boolean;
     onOpen: (open: boolean) => void;
}

const BaseModal: React.FC<BaseModalProps> = ({ children, open, onOpen }) => {
     return (
          <Modal
               open={open}
               onClose={() => onOpen(false)}
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description"
          >
               <Box
                    sx={{
                         position: "absolute" as "absolute",
                         top: "50%",
                         left: "50%",
                         transform: "translate(-50%, -50%)",
                         bgcolor: "background.paper",
                         borderRadius: 6,
                         boxShadow: 24,
                         p: 4,
                    }}
               >
                    {children}
               </Box>
          </Modal>
     );
};

export default memo(BaseModal);
