export const FREQUENCY_LIST = [
    {
        id: 1,
        key: 'minute',
        name: 'Minute'
    },
    {
        id: 2,
        key: 'daily',
        name: 'Daily'
    },
    {
        id: 3,
        key: 'weekly',
        name: 'Weekly'
    },
    {
        id: 4,
        key: 'monthly',
        name: 'Monthly'
    },
    {
        id: 5,
        key: 'quarterly',
        name: 'Quarterly'
    },
    {
        id: 6,
        key: 'semester',
        name: 'Semester'
    },
    {
        id: 7,
        key: 'annually',
        name: 'Annually'
    },
    
];

export const INTERVAL_DAYS = [
    {
        id: 1,
        name: 'Senin'
    },
    {
        id: 2,
        name: 'Selasa'
    },
    {
        id: 3,
        name: 'Rabu'
    },
    {
        id: 4,
        name: 'Kamis'
    },
    {
        id: 5,
        name: 'Jumat'
    },
    {
        id: 6,
        name: 'Sabtu'
    },
    {
        id: 7,
        name: 'Minggu'
    }
]

export function INTERVAL_DAY_IN_MONTH() {
    let _day = [];
    for (let index = 1; index <= 31; index++) _day.push(index)
    return _day;
}

export function INTERVAL_MONTHS() {
    let _day = [];
    for (let index = 1; index <= 12; index++) _day.push(index)
    return _day;
}

export const INTERVAL_QUARTERLY = [
    {
        id: 1,
        value: [1,4,7,10],
        name: 'Jan - April - Jul - Oct'
    },
    {
        id: 2,
        value: [2,5,8,11],
        name: 'Feb - Mei - Agustus - Nov'
    },
    {
        id: 3,
        value: [3,6,9,12],
        name: 'Maret - Jun - Sep - Desember'
    },
]

export const INTERVAL_SEMESTER = [
    {
        id: 1,
        value: [1,7],
        name: 'Jan - Jul'
    },
    {
        id: 2,
        value: [2,8],
        name: 'Feb - Agustus'
    },
    {
        id: 3,
        value: [3,9],
        name: 'Maret - September'
    },
    {
        id: 4,
        value: [4,10],
        name: 'April - Okt'
    },
    {
        id: 5,
        value: [5,11],
        name: 'Mei - Nov'
    },
    {
        id: 6,
        value: [6,12],
        name: 'Jun - Desember'
    },
]
