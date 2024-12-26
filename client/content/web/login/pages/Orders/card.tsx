import React from 'react';
import {
  Box,
  Card,
  Typography,
  Stack,
  Chip,
  Paper
} from '@mui/material';
import { Order } from '../../types/plans';
import CreditCard from '@mui/icons-material/CreditCard';
import Wallet from '@mui/icons-material/Wallet';


interface OrderCardProps {
  order: Order;
}


const PaymentTypeDisplay: React.FC<{ type: string }> = ({ type }) => {
    const getIcon = () => {
      switch (type.toLowerCase()) {
        case 'credit card':
          return <CreditCard sx={{ fontSize: 20 }} />;
        default:
          return <Wallet sx={{ fontSize: 20 }} />;
      }
    }

      return (
        <Paper 
          elevation={0}
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            px: 1,
            py: 1,
            backgroundColor: 'transparent',
            color: 'primary.dark',
            borderRadius: 2,
          }}
        >
          {getIcon()}
          <Typography  variant="body2" sx={{ fontWeight: 500,  textTransform: 'uppercase' }}>
            {type}
          </Typography>
        </Paper>
      );
};


export const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  
    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    };
  
    return (
      <Card 
        sx={{ 
          p: 2, 
          mb: 2,
          minWidth: '400px',
          backgroundColor: order.status === 'COMPLETED' ? 'background.paper' : 'inherit'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Stack spacing={1}>
            <Typography variant="h3">Plan {order.purchased_plan.planName}</Typography>
            <Typography variant="body2" sx={{ color: 'gray.500' }}>
              #{order.id}
            </Typography>
          </Stack>
          <Chip 
            label={order.status} 
            color={
              order.status === 'COMPLETED' ? 'success' : 
              order.status === 'FAILED' ? 'error' : 'warning'
            }
            size="small"
          />
        </Box>
  
        <Stack spacing={2}>
          <Box>
            <Typography variant="caption" sx={{ color: 'gray.400' }}>
              Payment Details
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>${order.purchased_plan.price}</Typography>
              <PaymentTypeDisplay type={order.payment_type} />
            </Box>
          </Box>
  
          <Box>
            <Typography variant="caption" sx={{ color: 'gray.400' }}>
              Credits
            </Typography>
            <Typography>{order.purchased_plan.credits}</Typography>
          </Box>
  
          {order.error_reason && !order.error_reason.includes('null') && (
            <Box>
              <Typography variant="caption" color="error">
                Error: {order.error_reason}
              </Typography>
            </Box>
          )}
  
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Typography variant="caption" sx={{ color: 'gray.400' }}>
              {formatDate(order.created_at)}
            </Typography>
          </Box>
        </Stack>
      </Card>
    );
  };