
type AccountStatus = 'ACTIVE' | 'SUSPENDED' | 'DELETED';

type account = {
    status: AccountStatus;
    payment_date: Date | null;
    plan_details: {
        plan_id: number; 
        credits: number;
    }
}

type creditsData = {
    credits_used: number;
    last_used_at: Date;
    default_per_day: number;
}

export type User = {
    id?: string;
    email?:string;
    account:account;
    credits:creditsData;
}
