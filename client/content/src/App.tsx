import { useSelection } from '@/hooks/useSelection';
import { IconButton, Popover, Popper, Snackbar,Box, Tooltip, CircularProgress } from '@mui/material';
import { PromptMenu } from './components/PromptsMenu';
import { usePromptManager } from './hooks/usePromptManager';
import { PromptResult } from './components/PromptsMenu/PromptResult';
import { useGetPromptResponse } from './hooks/useGetPromptResponse';
import { useSnackbar } from './hooks/useSnackbar';
import { useEffect, useRef, useState } from 'react';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useCredits } from './hooks/useCredits';
import UpgradePrompt from './components/PromptsMenu/UpgradePrompt';

import { sendMessageToWorker, sendTrackingEvent } from './utils';
import { BG_OPEN_LOGIN_PAGE, BroadcastMessages } from './constants';
import { useUserDetails } from './hooks/useUserDetails';
import { Events } from './constants/events';
import { listenToExternalMessages } from './services/ExternalMessagelistener';


function App() {
  const promptContRef = useRef<HTMLDivElement | null>(null);
  const {isAccountSuspended, fetchUserDetails, getUserDetailsFromStore, isLoading:isUserDetailsLoading} = useUserDetails();
  const {fetchAndInitializeCreditsDataFromServer, isCreditsAvailable} = useCredits();
  const [isPromptOpen, setPromptOpen]= useState(false);
  const {prompt, handlePromptChange, clearPrompt} = usePromptManager();
  const currentSelectionData = useSelection({
    shouldSelectText: (selection:Selection) => {
      if(!promptContRef.current){
        return true;
      }
      return !promptContRef.current.contains(selection.anchorNode) && !promptContRef.current.contains(selection.focusNode)
    }
  });
  const prevSelectionDataRef = useRef(currentSelectionData);
  const {data, error, loading, clearData:clearServerData, refetchData} = useGetPromptResponse(prompt, prevSelectionDataRef.current.selectedText); 
  const {open:snackbarOpen, message:snackbarMessage} = useSnackbar();

  const refetchDataFromStore = async () => {
    await getUserDetailsFromStore();
    await fetchAndInitializeCreditsDataFromServer();
  }


  // effect to listen to messages coming from the Service worker
  useEffect(() => {
    const onMessage = (message:string) => {
        switch(message){
          case BroadcastMessages.REFRESH_USER_DETAILS:
          case BroadcastMessages.USER_LOGGED_OUT:
          {
            refetchDataFromStore();
            return;
          }
          default: return;
        }
    }

    const removeListener = listenToExternalMessages(onMessage);
    return () => {
      removeListener();
    }
  }, [])

  // whenever app loads first load the credits data from the server
  useEffect(() => {
    const fetchAllData = async () => {
      await fetchUserDetails();
      await fetchAndInitializeCreditsDataFromServer();
    }
    fetchAllData();
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
    setPromptOpen(true);
    sendTrackingEvent(Events.PROMPT_OPEN);
  }

  const closePrompt = () => {
    setPromptOpen(false);
    sendTrackingEvent(Events.PROMPT_CLOSED);

  }

  const openLoginPage = () => {
    sendMessageToWorker(BG_OPEN_LOGIN_PAGE);
    sendTrackingEvent(Events.LOGIN_PAGE_OPENED);

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
          backgroundColor: isAccountSuspended ? theme.palette.grey[600] : theme.palette.primary.dark,
          borderRadius: '50%',
          width: '30px',
          height: '30px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        })}>
          <Tooltip title={isAccountSuspended ? 'Account Suspended' : ''}>
            <IconButton sx={{
              border: `2px white solid`,
              transform: 'scale(0.7)'
            }} 
            size="small" 
            onClick={!isUserDetailsLoading ? (isAccountSuspended ? openLoginPage : openPrompt): undefined}
            >
              {isUserDetailsLoading ?
                <CircularProgress sx={{
                  color: 'background.default'
                }} size={'20px'}/>
              :
                <AutoAwesomeIcon  sx={(theme) => ({
                  color: theme.palette.background.default
                  })}
                />
              }
            </IconButton>
          </Tooltip>
        </Box>
      </Popper>
    )
  }



 return (
      <>
          <Popover
          ref={promptContRef}
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
                  <UpgradePrompt  onUpgradeClick={openLoginPage}/>
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