

const isNextDay = (timestamp1, timestamp2) => {
    const d1 = new Date(timestamp1);
    const d2 = new Date(timestamp2);

    const startDate = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());
    const endDate = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());

    return endDate > startDate;

}

module.exports = {
    isNextDay
}