import { useSelection } from '@/hooks/useSelection';
import { IconButton, Popover, Popper, Snackbar,Box } from '@mui/material';
import { PromptMenu } from './components/PromptsMenu';
import { usePromptManager } from './hooks/usePromptManager';
import { PromptResult } from './components/PromptsMenu/PromptResult';
import { useGetPromptResponse } from './hooks/useGetPromptResponse';
import { useSnackbar } from './hooks/useSnackbar';
import { useEffect, useRef, useState } from 'react';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useCredits } from './hooks/useCredits';
import UpgradePrompt from './components/PromptsMenu/UpgradePrompt';

import { sendMessageToWorker } from './utils';
import { BG_OPEN_LOGIN_PAGE } from './constants';


function App() {
  const {fetchAndInitializeCreditsDataFromServer, isCreditsAvailable} = useCredits();
  const [isPromptOpen, setPromptOpen]= useState(false);
  const {prompt, handlePromptChange, clearPrompt} = usePromptManager();
  const currentSelectionData = useSelection();
  const prevSelectionDataRef = useRef(currentSelectionData);
  const {data, error, loading, clearData:clearServerData, refetchData} = useGetPromptResponse(prompt, prevSelectionDataRef.current.selectedText); 
  const {open:snackbarOpen, message:snackbarMessage} = useSnackbar();


  // whenever app loads first load the credits data from the server
  useEffect(() => {
    fetchAndInitializeCreditsDataFromServer();
  }, [])


  // setting prevSelection data only if we would have selected a text, current selected text can become null since focus can get lost while navigatingi n prompt menu
  if(currentSelectionData.selectedText){
    prevSelectionDataRef.current = currentSelectionData;
  }

  const { selectedNode, currentRange} = prevSelectionDataRef.current;
  

  const syncPrevSelectionData = () => {
    prevSelectionDataRef.current = currentSelectionData;
  }

  const openPrompt = () => {
    setPromptOpen(true)
  }

  const closePrompt = () => {
    setPromptOpen(false)
  }


  const handlePromptClose = () => {
    clearPrompt();
    syncPrevSelectionData();
    clearServerData();
    closePrompt();
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

  const isTextSelected = !!currentSelectionData.selectedText;


  if(isTextSelected && !isPromptOpen){
    return (
      <Popper
      open={true}
      anchorEl={selectedNode.element}
      placement="right"
      sx={(theme) => ({
        zIndex: theme.zIndex.popper
      })}
      >
        <Box sx={(theme) => ({
          backgroundColor: theme.palette.primary.dark,
          borderRadius: '50%',
          width: '30px',
          height: '30px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        })}>
          <IconButton sx={{
            border: `2px white solid`,
            transform: 'scale(0.7)'
          }} size="small" onClick={openPrompt}>
            <AutoAwesomeIcon  sx={(theme) => ({
              color: theme.palette.background.default
            })}/>
          </IconButton>
        </Box>
      </Popper>
    )
  }



 return (
      <>
          <Popover
          open={isPromptOpen}
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
              { isCreditsAvailable ? 
                  <PromptResult 
                  loading={loading}
                  error={error}
                  onApply={handleInsert}
                  onRefresh={refetchData}
                  text={data?.result ?? ''}
                  />

                :
                  <UpgradePrompt  onUpgradeClick={()=> sendMessageToWorker(BG_OPEN_LOGIN_PAGE)}/>
              }
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