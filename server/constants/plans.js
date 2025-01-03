

const FREE_CREDITS_PER_DAY = 25;

const Plans = {
    FREE: {
        id: 0,
        price: 0,
        credits: FREE_CREDITS_PER_DAY
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
}

module.exports = {
    Plans,
    FREE_CREDITS_PER_DAY
}