import { useSelection } from '@/hooks/useSelection';
import { Modal } from '@/components/Modal';
import { AiDescriptor } from '@/components/AiDescriptor';
import { useGetAiResponse } from '@/hooks/useGetAiResponse';

const getPrompt = () => {
  return `Summarize the text and provide a list of responses . Build response in such a way that it can be parsed using JSON.parse in node js. summary should be a string and responses should be an array of strings. Dont add json keyword in the starting of the response. Here is the text -`;
}

function App() {
  const {selectedText, selectedNode, removeSelectedNode, offset} = useSelection();
  const {data, error, loading} = useGetAiResponse(getPrompt(), selectedText); 

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


    if(isSameNode){
     /**
      *  if starting node and ending nodes are same, then we need to replace the text between the start and end offset
      */
      if(direction === 'backward'){
        const start = focusOffset;
        const end = anchorOffset;
        const textToReplace = textNodeContent.slice(start, end);
        selectedNode.anchorNode.textContent = selectedNode.anchorNode.textContent?.replace(textToReplace, text) ?? text;
      }else{
        const start = anchorOffset;
        const end = focusOffset;
        const textToReplace = textNodeContent.slice(start, end);
        selectedNode.focusNode.textContent = selectedNode.focusNode.textContent?.replace(textToReplace, text) ?? text;
      }
    }else{
      /**
       * if starting node and ending nodes are different, then we need to replace the text of the starting node with the text
       * and remove the text of the ending node
       */
      selectedNode.anchorNode.textContent = selectedNode.anchorNode.textContent?.replace(textNodeContent, text) ?? text;
      selectedNode.focusNode.textContent = '';
    }

    removeSelectedNode();
  }

  const open = !!selectedNode.parentElement;


 return (
        <Modal anchor={selectedNode.parentElement} open={open}>
            <AiDescriptor data={data} loading={loading} error={!!error} onClose={removeSelectedNode} onInsert={handleInsert} text={selectedText} />
        </Modal>
    )
}

export default App 