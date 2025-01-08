import { Box, keyframes } from "@mui/material"

const l3 = keyframes`
    20%{background-position:0%   0%, 50%  50%,100%  50%}
    40%{background-position:0% 100%, 50%   0%,100%  50%}
    60%{background-position:0%  50%, 50% 100%,100%   0%}
    80%{background-position:0%  50%, 50%  50%,100% 100%}
`

export const StreamTextLoader = () => {
    return (
        <Box component="span"  sx={theme => ({
            marginLeft: '5px',
            '& .loader ':{
                display: 'inline-block',
                width: '30px',
                aspectRatio: 2,
                '--_g': `no-repeat radial-gradient(circle closest-side,${theme.palette.gray[500]} 90%,#0000)`,
                background: `
                    var(--_g) 0%   50%,
                    var(--_g) 50%  50%,
                    var(--_g) 100% 50%`,
                backgroundSize: 'calc(100%/3) 50%',
                animation: `${l3} 1s infinite linear`,
            }
            
        })}>
            <span className="loader"></span> 
        </Box>
    )
}