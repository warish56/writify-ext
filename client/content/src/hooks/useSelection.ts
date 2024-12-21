import { debounce } from "@/utils"
import { useEffect, useRef, useState } from "react"

type CustomElement = {
    nodeType: 1;
    getBoundingClientRect: () => DOMRect;
}

type SelectedNode = {
    element: CustomElement | null;
    focusNode: Node | null;
    anchorNode: Node | null;
}

const initialSelectedNode: SelectedNode = {
    element: null,
    focusNode: null,
    anchorNode: null
}

export const useSelection = () => {
    const [selectedText, setSelectedText] = useState<string>('');
    const [selectedNode, setSelectedNode] = useState(initialSelectedNode);
    const currentRange = useRef<Range | null>(null);

    const removeSelectedNode = () => {
        setSelectedNode(initialSelectedNode)
    }

    const resetSelectionData = () => {
        currentRange.current = null;
        setSelectedText('');
        removeSelectedNode();
        setTimeout(() => {
            const selection = window.getSelection();
            selection?.empty();
        }, 0)

    }
   
    useEffect(() => {
        const handleSelectionChange = () => {
            const selection = window.getSelection()
            const value = selection?.toString()?.trim() || ''
            const isTextNode = selection?.anchorNode?.nodeName === "#text";
            if(value &&  isTextNode && selection.anchorOffset !== selection.focusOffset) {
                const range = selection.getRangeAt(0);
                // saving the range for future refrence while inserting text
                currentRange.current = range;
                const nodeCoordinates = range.getBoundingClientRect();
                setSelectedNode({
                    element: {
                        // mimicing it as an element since MUI Popover just requires this two properties to work properly
                        getBoundingClientRect: () => nodeCoordinates,
                        nodeType: 1 
                    },
                    anchorNode: selection?.anchorNode,
                    focusNode: selection?.focusNode
                })
                setSelectedText(value)
            }
        }

        const debouncedHandleSelectionChange = debounce(handleSelectionChange, 500) 
        document.addEventListener('selectionchange', debouncedHandleSelectionChange) 
        return () => {
            console.log('removing event listener')
            document.removeEventListener('selectionchange', debouncedHandleSelectionChange)
        }
    }, [])

    return {
        selectedText,
         selectedNode,
         resetSelectionData,
         currentRange: currentRange.current
        };
}