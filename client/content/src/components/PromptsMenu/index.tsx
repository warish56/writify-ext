import { useState } from "react"
import { List, ListItemButton, ListItemText, Tooltip } from "@mui/material"
import { Prompts } from "@/constants/prompts"

import { PromptActions } from "./PromptActions";
import { MenuWrapper } from "./MenuWrapper";

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { PromptInput } from "./PromptInput";

type prompts = typeof Prompts
type PromptCategory = keyof prompts



const categories = Object.keys(Prompts) as PromptCategory[];

type PromptMenuProps = {
    onAction: (prompt:string) => void;
    children: React.ReactNode;
    onClose: () => void;
}

export const PromptMenu = ({onAction, children, onClose}:PromptMenuProps) => {
    const [selectedAction, setSelectedAction] = useState('');
    const [currCategory, setCurrCategory] = useState<PromptCategory | null>(null);

    const clearCategory = () => {
        setCurrCategory(null);
    }
    const clearSelectedAction = () => {
        setSelectedAction('');
    }

    const handleClick = (category:PromptCategory) => {
        setCurrCategory(category)
    }

    const handleSelectAction = (prompt:string, action:string) => {
        setSelectedAction(action);
        onAction(prompt);
    }

    const handleCategoryBack = () => {
        clearCategory();
    }

    const handleActionBack = () => {
        clearSelectedAction();
    }


    if(selectedAction){
        return (
            <MenuWrapper sx={{
                minWidth: '400px'
            }} onBack={handleActionBack} title={selectedAction} onClose={onClose}>
                {children}
            </MenuWrapper>
        ) 
    }



    if(currCategory){
        return (
            <MenuWrapper 
            sx={{
                minWidth: currCategory === 'custom' ? '400px' : '250px'
            }}
            onBack={handleCategoryBack} title={currCategory} onClose={onClose}>
                { currCategory === 'custom' ?
                    <PromptInput onSubmit={onAction}>
                        {children}
                    </PromptInput>
                   :
                    <PromptActions list={Prompts[currCategory].list} onClick={handleSelectAction}/>
                }
            </MenuWrapper>
        )
    }

    return (
        <MenuWrapper title="Prompts" showBackButton={false} onClose={onClose}>
            <List sx={{
                width:'100%'
            }}>
                {
                    categories.map((category) => {
                        return (
                            <Tooltip title={Prompts[category].description}  placement="right">
                                <ListItemButton key={category} onClick={() => handleClick(category)}>
                                {/* <ListItemIcon>
                                <InboxIcon />
                                </ListItemIcon> */}
                                <ListItemText  
                                sx={{
                                    textTransform: 'capitalize'
                                }}  
                                primary={category} />
                                <ChevronRightIcon />
                            </ListItemButton>
                          </Tooltip>
                        )
                    })
                }
            </List>
        </MenuWrapper>
    )
}