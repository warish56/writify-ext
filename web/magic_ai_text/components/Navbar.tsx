'use client'

import {
  AppBar,
  Toolbar,
  Button,
  useScrollTrigger,
  Container,
  useTheme,
  Stack,
  IconButton,
} from '@mui/material';

import PlansIcon from '@mui/icons-material/ViewModule'
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home'

import { BrandLogo } from './BrandLogo';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { AppDrawer } from './Drawer';



const Navbar = () => {
  const theme = useTheme();
  const router = useRouter();
  const pathName = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);


  const currentLoaction = pathName;

  // Handles mobile menu
  const handleDrawerToggle = () => {
    setDrawerOpen((val) => !val);
  };

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  const navItems = [
    { label: 'Home', icon: <HomeIcon />, path: '/' },
    { label: 'Plans', icon: <PlansIcon />, path: '/plans' },
  ];

  const handleNavigation = (path: string) => {
    router.push(path)
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={trigger ? 1 : 0}
        sx={{
          backgroundColor: trigger ? 'background.paper' : 'transparent',
          backdropFilter: 'blur(8px)',
          borderBottom: trigger ? 1 : 0,
          borderColor: 'divider',
          transition: theme.transitions.create(['background-color', 'box-shadow', 'border'], {
            duration: theme.transitions.duration.short,
          }),
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            sx={{
              justifyContent: 'space-between',
              minHeight: { xs: 64, md: 72 },
              px: { xs: 2, sm: 4 },
            }}
          >

            <BrandLogo onClick={() => handleNavigation('/')}/>
         

            {/* Desktop Navigation */}
            <Stack
              direction="row"
              spacing={1}
              sx={{
                display: { xs: 'none', md: 'flex' },
              }}
            >
              {navItems.map((item) => {
                const isActive = currentLoaction === item.path
                return (
                <Button
                  key={item.label}
                  startIcon={item.icon}
                  onClick={() => handleNavigation(item.path)}
                  variant={isActive ? 'outlined': 'text'}
                  sx={{
                    px: 2,
                    py: 1,
                    color: 'text.primary',
                    borderRadius: 2,
                    '&:hover': {
                      backgroundColor: 'primary.light',
                      color: 'background.default',
                    },
                    transition: theme.transitions.create(['background-color', 'color'], {
                      duration: theme.transitions.duration.shorter,
                    }),
                  }}
                >
                  {item.label}
                </Button>
              )
              })}
            </Stack>

             {/* Mobile Menu Button */}
             <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>

          </Toolbar>
        </Container>
      </AppBar>
      
      <AppDrawer 
        open={drawerOpen}
        handleClose={handleDrawerToggle}
      />
      <Toolbar />
    </>
  );
};

export default Navbar;