'use client'

import {
  AppBar,
  Toolbar,
  Button,
  useScrollTrigger,
  Container,
  useTheme,
  Stack,
} from '@mui/material';

import PlansIcon from '@mui/icons-material/ViewModule'

import { BrandLogo } from './BrandLogo';
import { usePathname, useRouter } from 'next/navigation';



const Navbar = () => {
  const theme = useTheme();
  const router = useRouter();
  const pathName = usePathname();

  const currentLoaction = pathName;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  const navItems = [
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

          </Toolbar>
        </Container>
      </AppBar>
      {/* Toolbar spacer */}
      <Toolbar />
    </>
  );
};

export default Navbar;