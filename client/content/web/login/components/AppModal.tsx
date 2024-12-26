import { Box, Modal, ModalOwnProps } from "@mui/material"


type props = {
    open: boolean,
    onClose: ModalOwnProps['onClose'],
    children: React.ReactNode
}
export const AppModal = ({onClose, open, children}:props) => {
    return (
        <Modal
          open={open}
          onClose={onClose}
        >
          <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              borderRadius: 2,
              p: 4,
          }}>
            {children}
          </Box>
        </Modal>
    )
}