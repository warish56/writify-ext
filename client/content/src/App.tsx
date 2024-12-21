import { useSelection } from '@/hooks/useSelection';
import { Popover, Snackbar } from '@mui/material';
import { PromptMenu } from './components/PromptsMenu';
import { usePromptManager } from './hooks/usePromptManager';
import { PromptResult } from './components/PromptsMenu/PromptResult';
import { useGetPromptResponse } from './hooks/useGetPromptResponse';
import { useSnackbar } from './hooks/useSnackbar';



function App() {
  const {open:snackbarOpen, message:snackbarMessage} = useSnackbar()
  const {prompt, handlePromptChange, clearPrompt} = usePromptManager();
  const {selectedText, selectedNode, resetSelectionData, currentRange} = useSelection();
  const {data, error, loading, clearData:clearServerData, refetchData} = useGetPromptResponse(prompt, selectedText); 


  const handlePromptClose = () => {
    clearPrompt();
    resetSelectionData();
    clearServerData();
  }

  const handleInsert = (text: string) => {
    if(!selectedNode.anchorNode || !selectedNode.focusNode) return;

    const selection = window.getSelection();

    /**
     * 1. If the selection is lost then add the previous selected range
     * 2. delete the contents of the curent range
     * 3. add your textNode in that range
     * 4. Select the textNode and put the cursor at its end
     */

    if(currentRange && selection){
      selection.removeAllRanges();
      selection.addRange(currentRange);

      const range = currentRange;
      range.deleteContents();

      const textNode = document.createTextNode(text);
      range.insertNode(textNode);
      selection.removeAllRanges();

      const newRange = document.createRange();
      newRange.selectNodeContents(textNode);
      newRange.collapse(false); // Place the cursor at the end
      selection.addRange(newRange);
    }
  

  }

  const open = !!selectedText;

 return (
      <>
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
          disableAutoFocus
          anchorEl={selectedNode.element}
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
          <Snackbar
            open={snackbarOpen}
            message={snackbarMessage}
          />
        </>
    )
}

export default App 