import { Stack, Typography, Button } from "@mui/material"


type props = {
    suggestions: string[];
    onClick: (text:string) => void
}

export const SuggestionList = ({suggestions, onClick}:props) => {
    return (
        <Stack spacing={0.5}>
            {suggestions.map((result) => (
                <Button
                    key={result}
                    onClick={() => onClick(result)}
                    variant="text"
                    fullWidth
                    sx={{
                        justifyContent: 'flex-start',
                        textAlign: 'left',
                        p: '10px',
                        '&:hover': {
                            bgcolor: 'action.hover'
                        }
                    }}
                >
                    <Typography variant="body2" sx={{
                        textTransform: 'capitalize',
                        color: "gray.600",
                        maxWidth: '45ch',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}>{result}</Typography>
                </Button>
            ))}
        </Stack>
    )
}