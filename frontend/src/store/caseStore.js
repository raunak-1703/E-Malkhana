import {create} from 'zustand';

export const useCaseStore = create((set)=>({
    currentCaseId:null,
    selectedCase:null,

    setCaseId: (casId)=> set({currentCaseId:casId}),

    clearCaseId: ()=>set({currentCaseId:null}),

    setSelectedCase: (caseData)=> set({selectedCase:caseData}),

    clearSelectedCase: ()=>set({selectedCase:null}),
}))