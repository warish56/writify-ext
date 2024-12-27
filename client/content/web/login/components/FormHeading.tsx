import { Stack, Typography } from "@mui/material"
import { BrandLogo } from "./BrandLogo"

export const FormHeading = () => {
    return (
         <Stack alignItems="center" spacing={2}>
            <BrandLogo />
            <Typography variant="body2" color="text.secondary">
                Your AI Writing Assistant
            </Typography>
        </Stack>
    )
}