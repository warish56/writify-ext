import { useSelection } from '@/hooks/useSelection';
import { AiDescriptor } from '@/components/AiDescriptor';
import { useGetAiResponse } from '@/hooks/useGetAiResponse';
import { PromptActions } from './components/AiDescriptor/PromptActions';
import { useRef, useState } from 'react';
import { Prompts } from './types/prompt';
import { Box, Popover } from '@mui/material';


type PromptState = {
  text: string;
  type: Prompts | null
}

const initialPromptData = {
  text:'', 
  type: null 
}

function App() {
  const [promptData, setPromptData] = useState<PromptState>(initialPromptData);
  const {selectedText, selectedNode, resetSelectionData, offset} = useSelection();
  const {data, error, loading, clearData:clearServerData} = useGetAiResponse(promptData.text, selectedText); 
  const contentRef = useRef<HTMLDivElement | null>(null);

  const handlePromptChange = (prompt:string, type:Prompts) => {
    setPromptData({text: prompt, type})
  }

  const handleModalClose = () => {
    setPromptData(initialPromptData);
    resetSelectionData();
    clearServerData();
  }

  const selectTextNode = (node:Node) => {
    const range = document.createRange();
    range.selectNode(node);
    const windowSelection = window.getSelection();
    windowSelection?.addRange(range);
  }

  const handleInsert = (text: string) => {
    if(!selectedNode.anchorNode || !selectedNode.focusNode) return;

    // const clonedNode = selectedNode.anchorNode.cloneNode(true);
    // clonedNode.textContent = clonedNode.textContent?.replace(clonedNode.textContent, text) ?? text;
    // selectedNode.anchorNode.parentNode?.replaceChild(clonedNode, selectedNode.anchorNode);

    const {anchorOffset, focusOffset} = offset;
    const direction = anchorOffset > focusOffset ? 'backward' : 'forward';
    const isSameNode = selectedNode.anchorNode === selectedNode.focusNode;

    const textNode = selectedNode.anchorNode;
    const textNodeContent = textNode.textContent || '';

    let replacedNode = null;
    if(isSameNode){
     /**
      *  if starting node and ending nodes are same, then we need to replace the text between the start and end offset
      */
      if(direction === 'backward'){
        const start = focusOffset;
        const end = anchorOffset;
        const textToReplace = textNodeContent.slice(start, end);
        selectedNode.anchorNode.textContent = selectedNode.anchorNode.textContent?.replace(textToReplace, text) ?? text;
        replacedNode = selectedNode.anchorNode;
      }else{
        const start = anchorOffset;
        const end = focusOffset;
        const textToReplace = textNodeContent.slice(start, end);
        selectedNode.focusNode.textContent = selectedNode.focusNode.textContent?.replace(textToReplace, text) ?? text;
        replacedNode = selectedNode.focusNode;
      }
    }else{
      /**
       * if starting node and ending nodes are different, then we need to replace the text of the starting node with the text
       * and remove the text of the ending node
       */
      selectedNode.anchorNode.textContent = selectedNode.anchorNode.textContent?.replace(textNodeContent, text) ?? text;
      selectedNode.focusNode.textContent = '';
      replacedNode = selectedNode.anchorNode;
    }


    // at the end select the modified node to keep the selection intact
    selectTextNode(replacedNode);

  }

  const open = !!selectedNode.parentElement;

 return (
        <Popover
        open={open}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        anchorEl={selectedNode.parentElement}
        >
          <Box sx={{
            width: '400px',
            height: '300px',
            '& *': {
              userSelect: 'none'
            }
          }}>
            <AiDescriptor 
              ref={contentRef}
              header={
                <PromptActions 
                  onChange={handlePromptChange}
                  active={promptData.type}
                />
              }
              data={data} 
              loading={loading} 
              error={!!error} 
              onClose={handleModalClose} 
              onInsert={handleInsert} 
              text={selectedText} 
            />
          </Box>
        </Popover>
    )
}

export default App 