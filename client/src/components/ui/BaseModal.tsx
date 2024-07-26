import { ReactNode } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

interface BaseModalProps {
     children: ReactNode;
     open: boolean;
     onClose: () => void;
}

const BaseModal: React.FC<BaseModalProps> = ({ children, open, onClose }) => {
     return (
          <>
               <Modal
                    open={open}
                    onClose={onClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
               >
                    <Box
                         sx={{
                              position: "absolute" as "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              width: 600,
                              bgcolor: "background.paper",
                              borderRadius: 6,
                              boxShadow: 24,
                              p: 4,
                         }}
                    >
                         {children}
                    </Box>
               </Modal>
          </>
     );
};

export default BaseModal;
