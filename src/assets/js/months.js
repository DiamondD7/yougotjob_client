const today = new Date();
export let currentYear = today.getFullYear();

export const monthList = [
        {
            monthName:"Jan",
            maxDays:31
        },
        {
            monthName:"Feb",
            maxDays: currentYear % 4 === 0 ? 29 : 28 ,
        },
        {
            monthName:"Mar",
            maxDays:31,
        },
        {
            monthName:"Apr",
            maxDays:30,
        },
        {
            monthName:"May",
            maxDays:31,
        },
        {
            monthName:"Jun",
            maxDays:30,
        },
        {
            monthName:"Jul",
            maxDays:31,
        },
        {
            monthName:"Aug",
            maxDays:31,
        },
        {
            monthName:"Sep",
            maxDays:30,
        },
        {
            monthName:"Oct",
            maxDays:31,
        },
        {
            monthName:"Nov",
            maxDays:30,
        },
        {
            monthName:"Dec",
            maxDays:31,
        },
    ]
    
    export const handleYearChange = (year) => {
        let updatedYear = year

        let updatedMonthList = [
        {
            monthName:"Jan",
            maxDays:31
        },
        {
            monthName:"Feb",
            maxDays: updatedYear % 4 === 0 ? 29 : 28 ,
        },
        {
            monthName:"Mar",
            maxDays:31,
        },
        {
            monthName:"Apr",
            maxDays:30,
        },
        {
            monthName:"May",
            maxDays:31,
        },
        {
            monthName:"Jun",
            maxDays:30,
        },
        {
            monthName:"Jul",
            maxDays:31,
        },
        {
            monthName:"Aug",
            maxDays:31,
        },
        {
            monthName:"Sep",
            maxDays:30,
        },
        {
            monthName:"Oct",
            maxDays:31,
        },
        {
            monthName:"Nov",
            maxDays:30,
        },
        {
            monthName:"Dec",
            maxDays:31,
        },
    ]

        return updatedMonthList;
    }