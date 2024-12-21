import { copyToClipBoard } from "@/utils";
import { useSnackbar } from "./useSnackbar"


export const useClipboard = () => {
    const {showSnackbar} = useSnackbar();

    const copyToBoard = (text:string) => {
            copyToClipBoard(text).then(() => {
                showSnackbar({
                    message: 'Copied to clipboard',
                    type:'info'
                })
            })
    }

    return {
        copyToBoard
    }

}