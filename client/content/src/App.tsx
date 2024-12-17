import { useSelection } from '@/hooks/useSelection';
import { Modal } from '@/components/Modal';
import { AiDescriptor } from '@/components/AiDescriptor';
import { useGetAiResponse } from '@/hooks/useGetAiResponse';

const getPrompt = () => {
  return `Summarize the text and provide a list of responses . Build response in such a way that it can be parsed using JSON.parse in node js. summary should be a string and responses should be an array of strings. Dont add json keyword in the starting of the response. Here is the text -`;
}

function App() {
  const {selectedText, selectedNode, removeSelectedNode} = useSelection();
  const {data, error, loading} = useGetAiResponse(getPrompt(), selectedText); 

  const handleInsert = (text: string) => {
    if(!selectedNode.anchorNode || !selectedNode.focusNode) return;


    if(selectedNode.anchorNode !== selectedNode.focusNode){
      selectedNode.focusNode.parentNode?.removeChild(selectedNode.focusNode);
    }

    const clonedNode = selectedNode.anchorNode.cloneNode(true);
    clonedNode.textContent = text;
    selectedNode.anchorNode.parentNode?.replaceChild(clonedNode, selectedNode.anchorNode);


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