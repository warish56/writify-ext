import { useState } from "react"
import { List, ListItemButton, ListItemText } from "@mui/material"
import { Prompts } from "@/constants/prompts"

import { PromptActions } from "./PromptActions";
import { MenuWrapper } from "./MenuWrapper";

import ChevronRightIcon from '@mui/icons-material/ChevronRight';

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
            <MenuWrapper onBack={handleCategoryBack} title={currCategory} onClose={onClose}>
                <PromptActions
                    list={Prompts[currCategory].list}
                    onClick={handleSelectAction}
                />
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
                        )
                    })
                }
            </List>
        </MenuWrapper>
    )
}