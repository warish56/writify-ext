
type AccountStatus = 'ACTIVE' | 'SUSPENDED' | 'DELETED';

type account = {
    status: AccountStatus;
    payment_date: Date | null;
    plan_details: {
        plan_id: number; 
        credits: number;
    }
}

export type User = {
    id?: string;
    email?:string;
    account:account
}
