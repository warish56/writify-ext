
type AccountStatus = 'ACTIVE' | 'SUSPENDED' | 'DELETED';

type account = {
    status: AccountStatus;
    payment_date?: Date | null;
    plan_details: {
        plan_id: number; 
        credits: number;
    }
}
type creditsData = {
    credits_used: number;
    last_used_at: Date;
}

export type User = {
    id?: string;
    email?:string;
    credits:creditsData;
    account:account
}
