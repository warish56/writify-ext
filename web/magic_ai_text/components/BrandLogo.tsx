'use client'

import {
  Typography,
  Box
} from '@mui/material';
import BrandIcon from '@mui/icons-material/AutoAwesome';


type props = {
    onClick? : () => void
}
export const BrandLogo = ({onClick}:props) => {
    return (
           <Box
           sx={{
             display: 'flex',
             alignItems: 'center',
             gap: 1,
             cursor: 'pointer',
             '&:hover': {
               '& .brand-icon': {
                 transform: 'rotate(180deg)',
               },
             },
           }}
           onClick={onClick}
         >
           <BrandIcon
             className="brand-icon"
             sx={{
               fontSize: 32,
               color: 'primary.main',
               transition: 'transform 0.8s ease-in-out',
             }}
           />
           <Typography
             variant="h1"
             sx={(theme) => ({
               fontSize: { xs: '1.2rem', md: '1.5rem' },
               fontWeight: 700,
               background: `linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
               WebkitBackgroundClip: 'text',
               WebkitTextFillColor: 'transparent',
             })}
           >
             AIMagicText
           </Typography>
         </Box>
    )
}