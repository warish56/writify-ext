
export type PlanTypes = 'FREE' | 'PRO' | 'ELITE';
export type PlanStatus = 'COMPLETED' | 'FAILED' | 'PENDING';

export type Plan = {
    id:number;
    price: number;
    credits: number;
}


export type Order = {
    id: string,
    status: PlanStatus;
    purchased_plan: { planName: PlanTypes; } & Plan,
    payment_type: string;
    error_reason?: string;
    created_at: string;
    updated_at: string;
}