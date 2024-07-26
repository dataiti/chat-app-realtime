import { Box } from "@mui/material";

interface BaseTabPanelProps {
     value: string | null;
     index: string;
     children: React.ReactNode;
}

const BaseTabPanel: React.FC<BaseTabPanelProps> = ({
     value,
     index,
     children,
}) => (value === index ? <Box>{children}</Box> : null);

export default BaseTabPanel;
