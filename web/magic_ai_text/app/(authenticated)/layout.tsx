

import Navbar from "@/components/Navbar"
import { Stack } from "@mui/material"



type props = {
    children: React.ReactNode
}

export default function Layout({children}:props){
    return (
        <Stack>
            <Navbar/>
            {children}
        </Stack>
    )
}