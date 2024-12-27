import { useState } from 'react';
import { Box, Typography, Tabs, Tab, Container, } from '@mui/material';
import { OrderSkeleton } from './skeleton';
import { OrderCard } from './card';
import { useUserOrders } from '../../hooks/useUserOrders';
import { EmptyOrders } from './empty';


const OrdersList = () => {
    const [currentTab, setCurrentTab] = useState(0);
    const {isLoading:loading, data , error} = useUserOrders()
  
    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
      setCurrentTab(newValue);
    };
  

    const ordersList = data?.list ?? [];
    const completedOrders = ordersList.filter(order => order.status === 'COMPLETED');
    const faileddOrders = ordersList.filter(order => order.status === 'FAILED')
    const pendingOrders = ordersList.filter(order => order.status === 'PENDING')

    const list = [completedOrders, faileddOrders, pendingOrders];

    const orders = list[currentTab]

  
    return (
      <Container maxWidth="sm" sx={{
        p:2,
        paddingTop: '30px',
        mx:'auto'
      }}>
        <Typography variant="h1" sx={{ mb: 3 }}>My Orders</Typography>
        
        <Tabs 
          value={currentTab}
          onChange={handleTabChange}
          sx={{
            mb: 3,
            '& .MuiTab-root': {
              textTransform: 'none',
              fontSize: '1rem',
            }
          }}
        >
          <Tab label="Completed" />
          <Tab label="Failed" />
          <Tab label="Pending" />
        </Tabs>
  
        <Box>

            {error && 
                <Typography color='error'>Failed to fetch orders</Typography>
            }

            {loading && !error &&   
                Array(3).fill(0).map((_, index) => (
                <OrderSkeleton key={index} />
                ))
            }
            {!loading && !error &&
                orders.map(order => (
                <OrderCard key={order.id} order={order} />
                ))
            }
            {
                !loading && !error && orders.length === 0 && 
                <EmptyOrders/>
            }
        </Box>
      </Container>
    );
  };


export default OrdersList;
