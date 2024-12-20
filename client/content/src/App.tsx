import { useSelection } from '@/hooks/useSelection';
import { Popover } from '@mui/material';
import { PromptMenu } from './components/PromptsMenu';
import { usePromptManager } from './hooks/usePromptManager';
import { PromptResult } from './components/PromptsMenu/PromptResult';
import { useGetPromptResponse } from './hooks/useGetPromptResponse';


// const InputDescriptor = () => {
//   return (
//     <Box sx={{
//       width: '400px',
//       height: '300px',
//       '& *': {
//         userSelect: 'none'
//       }
//     }}>
//       <AiDescriptor 
//         ref={contentRef}
//         header={
//           <PromptActions 
//             onChange={handlePromptChange}
//             active={promptData.type}
//           />
//         }
//         data={data} 
//         loading={loading} 
//         error={!!error} 
//         onClose={handleModalClose} 
//         onInsert={handleInsert} 
//         text={selectedText} 
//       />
//     </Box>
//   )
// }






function App() {
  const {prompt, handlePromptChange, clearPrompt} = usePromptManager();
  const {selectedText, selectedNode, resetSelectionData, offset} = useSelection();
  const {data, error, loading, clearData:clearServerData, refetchData} = useGetPromptResponse(prompt, selectedText); 


  const handlePromptClose = () => {
    clearPrompt();
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
          <PromptMenu 
            onAction={handlePromptChange}
            onClose={handlePromptClose}
          >
           <PromptResult 
           loading={loading}
           error={error}
           onApply={handleInsert}
           onRefresh={refetchData}
           text={data?.result ?? ''}
           /> 
          </PromptMenu>
        </Popover>
    )
}

export default App 