import { Avatar, List, ListItemButton, ListItemIcon, ListItemText, Tooltip} from "@mui/material"
import { Prompts } from "@/constants/prompts"
import { Prompt } from "@/types/AiResponse"




type prompts = typeof Prompts
type PromptCategory = keyof prompts
type promptActions = prompts[PromptCategory]['list']


type PromptActionProps ={
    list: promptActions,
    onClick: (prompt:Prompt, actionType:string)=>void
}

export const PromptActions = ({list, onClick}:PromptActionProps) => {
    return (
        <List sx={{
            width:'100%'
        }}>

            {
                list.map(({title, prompt, description, icon}) => {
                    return (
                        <Tooltip  key={title} title={description} placement="right">
                            <ListItemButton 
                            onClick={() => onClick(prompt, title)}
                            >
                            {!!icon &&
                                <ListItemIcon>
                                    <Avatar sx={{
                                        width: '32px',
                                        height: '32px',
                                        bgcolor: 'secondary.main'
                                    }}>
                                        {icon}
                                    </Avatar>
                                </ListItemIcon>
                            }
                            <ListItemText sx={(theme) => ({
                                textTransform: 'capitalize',
                                color: theme.palette.text.default
                            })} primary={title} />
                        </ListItemButton>
                      </Tooltip>
                    )
                })
            }

        </List>
    )
}

