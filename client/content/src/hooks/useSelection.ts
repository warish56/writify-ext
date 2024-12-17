import { debounce } from "@/utils"
import { useEffect, useState } from "react"


type SelectedNode = {
    parentElement: HTMLElement | null;
    focusNode: Node | null;
    anchorNode: Node | null;
}

const initialSelectedNode: SelectedNode = {
    parentElement: null,
    focusNode: null,
    anchorNode: null
}

export const useSelection = () => {
    const [selectedText, setSelectedText] = useState<string>('');
    const [selectedNode, setSelectedNode] = useState(initialSelectedNode);
    const [offset, setOffset] = useState({anchorOffset: 0, focusOffset: 0});


    const removeSelectedNode = () => {
        console.log('removing selected node')
        setSelectedNode(initialSelectedNode)
    }
   
    useEffect(() => {
        const handleSelectionChange = () => {
            const selection = window.getSelection()
            const value = selection?.toString() || ''
            console.log('selectionchange', selection)
            setSelectedText(value)
            if(value && selection?.anchorNode?.parentElement) {
                setSelectedNode({
                    parentElement: selection?.anchorNode?.parentElement,
                    anchorNode: selection?.anchorNode,
                    focusNode: selection?.focusNode
                })
                setOffset({anchorOffset: selection?.anchorOffset, focusOffset: selection?.focusOffset})
            }else{
                removeSelectedNode()
            }
        }

        const debouncedHandleSelectionChange = debounce(handleSelectionChange, 500) 
        document.addEventListener('selectionchange', debouncedHandleSelectionChange) 
        return () => {
            console.log('removing event listener')
            document.removeEventListener('selectionchange', debouncedHandleSelectionChange)
        }
    }, [])

    return {selectedText, selectedNode, offset, removeSelectedNode};
}