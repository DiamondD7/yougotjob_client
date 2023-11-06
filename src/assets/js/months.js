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


export const getDaysFromPreviousMonth = (selectedYear, months, selectedMonth) => {
    //get the prefix of the last month

    const todayDate = new Date(selectedYear, months.indexOf(selectedMonth), 1);
    todayDate.setDate(0); // Set the date to the last day of the previous month
    const daysInPreviousMonth = todayDate.getDate(); // Get the number of days in the previous month
    const prefixDaysArray = [];

    for (
      let i = daysInPreviousMonth;
      i > daysInPreviousMonth - todayDate.getDay();
      i--
    ) {
      prefixDaysArray.unshift(i);
    }

    return prefixDaysArray;
  };


export const getNextMonthDays = (selectedYear, months, selectedMonth) => {
    //get the prefix of the next month

    const nextMonthDate = new Date( //next month date
      selectedYear,
      months.indexOf(selectedMonth) + 1,
      1
    );
    
    const todayDate = new Date( //todays date
        selectedYear,
        months.indexOf(selectedMonth),
        1
      );
      todayDate.setDate(0); //setting to the last day of the previous month.

    const currentMonthLastDay = new Date( //current last day of this month.
      selectedYear,
      months.indexOf(selectedMonth) + 1,
      1
    );
    currentMonthLastDay.setDate(0); // Set the date to the last day of the previous month
    const nextMonthPrefixArray = [];
    for (
      let i = nextMonthDate.getDate();
      i <= 42 - (currentMonthLastDay.getDate() + todayDate.getDay()); //the display grid is 42 grids in total and minus the maximum date of the current month plus the last day of the previous month (Tues(2))
      i++
    ) {
      nextMonthPrefixArray.push(i);
    }
    return nextMonthPrefixArray;
  };