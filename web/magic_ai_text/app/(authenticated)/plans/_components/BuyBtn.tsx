'use client'

import { Button } from "@mui/material"


type props = {
    currentPlan: boolean; 
    isFreePlan: boolean
}

export const BuyBtn = ({currentPlan, isFreePlan}:props) => {
    const onClick = () => {
        window.open(process.env.NEXT_PUBLIC_EXTENSION_URL, '_blank')
    }
    return (
        <Button
        variant={currentPlan ? 'outlined' : 'contained'}
        color={currentPlan ? 'secondary' : 'primary'}
        onClick={onClick}
        sx={{
            opacity: !isFreePlan ? 1 : 0,
            mt: 4,
            textTransform: 'capitalize',
            borderColor: currentPlan ? 'primary.contrastText' : undefined,
            color: currentPlan ? 'primary.contrastText' : undefined,
        }}
        >
            Buy Plan
        </Button>
    )
}