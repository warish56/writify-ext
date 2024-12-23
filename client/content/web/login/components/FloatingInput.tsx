import React from 'react';
import { Box, InputBase, styled } from '@mui/material';
import { InputHTMLAttributes } from 'react';

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    'label': {
        position: 'absolute',
        left: 16,
        top: '50%',
        transform: 'translateY(-50%)',
        color: theme.palette.text.secondary,
        fontSize: 14,
        pointerEvents: 'none',
        transition: '0.2s ease all',
    },
    'input': {
        width: '100%',
        padding: '12px 16px',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        fontSize: 14,
        color: theme.palette.text.primary,
        background: 'transparent',
        transition: 'border-color 0.2s',
        '&:focus': {
            borderColor: theme.palette.primary.main,
        },
        '&:focus ~ label, &:not(:placeholder-shown) ~ label': {
            top: -8,
            left: 12,
            fontSize: 12,
            background: theme.palette.background.paper,
            padding: '0 4px',
            color: theme.palette.primary.main,
        },
    },
}));

type FloatingInputProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
};

export const FloatingInput = ({ label, id, ...props }: FloatingInputProps) => {
    return (
        <Box sx={{ position: 'relative' }}>
            <StyledInputBase
                {...props}
                id={id}
                fullWidth
                placeholder=" "
            />
            <label htmlFor={id}>{label}</label>
        </Box>
    );
};