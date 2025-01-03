import { debounce } from "@/utils"
import { useEffect, useState } from "react"

type CustomElement = {
    nodeType: 1;
    getBoundingClientRect: () => DOMRect;
}

type SelectedNode = {
    element: CustomElement | null;
    focusNode: Node | null;
    anchorNode: Node | null;
    range: Range | null;
    text: string;
}

const initialSelectionData: SelectedNode = {
    element: null,
    focusNode: null,
    anchorNode: null,
    range: null,
    text: ''
}

type props ={
    shouldSelectText: (selection:Selection) => boolean
}

export const useSelection = ({shouldSelectText}:props) => {
    const [selectionData, setSelectionData] = useState(initialSelectionData);

    const clearSelectionData = () => {
        setSelectionData(initialSelectionData)
    }

    const resetSelectionData = () => {
        clearSelectionData();
        setTimeout(() => {
            const selection = window.getSelection();
            selection?.empty();
        }, 0)

    }
   
    useEffect(() => {
        const handleSelectionChange = () => {
            const selection = window.getSelection()
            const selectedText = selection?.toString()?.trim() || ''
            const isTextNode = selection?.anchorNode?.nodeName === "#text";
            if(selection && !shouldSelectText(selection)){
                return;
            }
            if(
                selectedText &&  
                isTextNode 
                //&& selection.anchorOffset !== selection.focusOffset
            ) {
                const range = selection.getRangeAt(0);
                const nodeCoordinates = range.getBoundingClientRect(); 
                setSelectionData({
                        element: {
                            // mimicing it as an element since MUI Popover just requires this two properties to work properly
                            getBoundingClientRect: () => nodeCoordinates,
                            nodeType: 1 
                        },
                        text: selectedText,
                        anchorNode: selection?.anchorNode,
                        focusNode: selection?.focusNode,
                        range
                })
            }else{
                clearSelectionData();
            }
        }

        const debouncedHandleSelectionChange = debounce(handleSelectionChange, 100) 
        document.addEventListener('selectionchange', debouncedHandleSelectionChange) 
        return () => {
            document.removeEventListener('selectionchange', debouncedHandleSelectionChange)
        }
    }, [])

    return {
         selectedText: selectionData.text,
         selectedNode: {
            element: selectionData.element,
            focusNode: selectionData.focusNode,
            anchorNode: selectionData.anchorNode,
         },
         resetSelectionData,
         currentRange: selectionData.range
        };
}