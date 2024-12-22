import { creditsAtom } from "@/atoms/credits"
import { CreditBgActions } from "@/constants/credits";
import { sendMessageToWorker } from "@/utils";
import { useAtom } from "jotai"


export const useCredits = () => {
    const [creditData, updateCreditData] = useAtom(creditsAtom);

    const initializeCreditsData = async () => {
        const {success, totalCredits, usedCredits} = await sendMessageToWorker(CreditBgActions.BG_GET_CREDITS_DATA);
        if(success){
            updateCreditData(prev=> ({
                ...prev,
                totalCredits,
                used: usedCredits
            }))
        }
    }

    const fetchAndInitializeCreditsDataFromServer = async () => {
       const {success} = await sendMessageToWorker(CreditBgActions.BG_FETCH_CREDITS_DATA);
       if(success){
        initializeCreditsData();
       }
    }

    const useAvailableCredits =  async () => {
        let resolved : (({newUsed, prevUsed}:{newUsed:number, prevUsed: number}) => void) | null = null;
        const promise = new Promise<{newUsed:number, prevUsed: number}>((res) => {
            resolved = res;
        })
        updateCreditData(prevVal => {
            const newUsed = Math.min(prevVal.used + 1, prevVal.totalCredits)
            resolved?.({newUsed, prevUsed:prevVal.used});
            return {
                ...prevVal,
                used: newUsed
            }
        })

        const {newUsed, prevUsed}  = await promise;
        const {success} = await sendMessageToWorker(CreditBgActions.BG_UPDATE_AVAILABLE_CREDITS, {credits: newUsed});
        if(!success){
            updateCreditData(prevVal => {
                return {
                    ...prevVal,
                    used: prevUsed
                }
            })
        }
    
    }


    return {
        useAvailableCredits,
        fetchAndInitializeCreditsDataFromServer,
        isCreditsAvailable: creditData.used < creditData.totalCredits,
        availableCredits : creditData.totalCredits - creditData.used,
    }
}