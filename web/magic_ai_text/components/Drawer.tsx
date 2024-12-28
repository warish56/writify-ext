import { ListItemText } from "@mui/material"
import { ListItem } from "@mui/material"
import { IconButton, List } from "@mui/material"
import { Box } from "@mui/material"
import { Drawer } from "@mui/material"

import CloseIcon from '@mui/icons-material/Close';
import PlansIcon from '@mui/icons-material/ViewModule'
import HomeIcon from '@mui/icons-material/Home'

import { usePathname, useRouter } from "next/navigation";


type props = {
    open: boolean;
    handleClose: () => void;
}

const navItems = [
    { label: 'Home', icon: <HomeIcon />, path: '/' },
    { label: 'Plans', icon: <PlansIcon />, path: '/plans' },
  ];



export const AppDrawer = ({open, handleClose}:props) => {

    const router = useRouter();
    const pathName = usePathname();

    const currentLoaction = pathName;

    
    const handleNavigation = (path: string) => {
        router.push(path);
        handleClose();
      };

    return (
        <Drawer
        variant="temporary"
        anchor="right"
        open={open}
        onClose={handleClose}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: 240,
            backgroundColor: 'background.paper',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {navItems.map((item) => (
              <ListItem
                key={item.label}
                onClick={() => handleNavigation(item.path)}
                sx={(theme) => ({
                  borderRadius: 1,
                  mb: 1,
                  outline: currentLoaction === item.path ? `1px ${theme.palette.primary.main} solid` : 'none',
                  '&:hover': {
                    backgroundColor: 'primary.light',
                    color: 'background.default',
                  },
                })}
              >
                <Box sx={{ mr: 2 }}>{item.icon}</Box>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    )
}