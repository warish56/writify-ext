import { List, ListItemButton, ListItemText, Tooltip} from "@mui/material"
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
                list.map(({title, prompt, description}) => {
                    return (
                        <Tooltip  key={title} title={description} placement="right">
                            <ListItemButton 
                            onClick={() => onClick(prompt, title)}
                            >
                            {/* <ListItemIcon>
                            <SendIcon />
                            </ListItemIcon> */}
                            <ListItemText sx={{
                                textTransform: 'capitalize'
                            }} primary={title} />
                        </ListItemButton>
                      </Tooltip>
                    )
                })
            }

        </List>
    )
}

