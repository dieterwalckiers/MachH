export const leapYears = [2020, 2024, 2028, 2032, 2036, 2040, 2044];

export function getMonths(year: number): { [monthIndex: number]: { name: string, nrDays: number } } {
    return {
        0: { name: "januari", nrDays: 31 },
        1: { name: "februari", nrDays: leapYears.includes(year) ? 29 : 28 },
        2: { name: "maart", nrDays: 31 },
        3: { name: "april", nrDays: 30 },
        4: { name: "mei", nrDays: 31 },
        5: { name: "juni", nrDays: 30 },
        6: { name: "juli", nrDays: 31 },
        7: { name: "augustus", nrDays: 31 },
        8: { name: "september", nrDays: 30 },
        9: { name: "oktober", nrDays: 31 },
        10: { name: "november", nrDays: 30 },
        11: { name: "december", nrDays: 31 },
    };
}

export function getFromTo(year: number = new Date().getFullYear(), monthIndex: number = new Date().getMonth()) {
    return {
        dateStrFrom: `${year}-${monthIndex + 1}-01`,
        dateStrTo: `${year}-${monthIndex + 1}-${getMonths(year)[monthIndex].nrDays}`,
    }
}