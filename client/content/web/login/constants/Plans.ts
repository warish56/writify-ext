import { Plan, PlanTypes } from "../types/plans";

export const Plans: Record<PlanTypes, Plan> = {
    FREE: {
        id: 0,
        price: 0,
        credits: 25
    },

    PRO: {
        id: 1,
        price: 250,
        credits: 300
    },

    ELITE: {
        id: 2,
        price: 350,
        credits: 500
    },
};
