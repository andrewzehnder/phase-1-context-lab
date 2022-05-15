/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let arrayOfEmployees = []

function createEmployeeRecord(arrayOfEmployees) {
    let employee = {
        firstName: arrayOfEmployees[0],
        familyName: arrayOfEmployees[1],
        title: arrayOfEmployees[2],
        payPerHour: arrayOfEmployees[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
}

function createEmployeeRecords(arrayOfArrays) {
    let arrayOfObjects = [];
    for(let array of arrayOfArrays) {
        let employeeRecord = createEmployeeRecord(array);
        arrayOfObjects.push(employeeRecord);
    }
    return arrayOfObjects;
}

function createTimeInEvent(dateStamp) {
    const hour = dateStamp.split(" ")[1];
    const date = dateStamp.split(" ")[0];
    const timeIn = {
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    }
    this.timeInEvents.push(timeIn);
    return this;
}

function createTimeOutEvent(dateStamp) {
    const hour = dateStamp.split(" ")[1];
    const date = dateStamp.split(" ")[0];
    const timeOut = {
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    }
    this.timeOutEvents.push(timeOut);
    return this;
}

function hoursWorkedOnDate(date) {
    let hoursWorked = 0
    // console.log("this", this);
    // for(let i = 0; i < this.timeInEvents.length; i++){
    //     if (date === this.timeInEvents[i].date) {
    //         let timeInHours = this.timeInEvents[i].hour;
    //         let timeOutHours = this.timeOutEvents[i].hour;
    //         hoursWorked = ((timeOutHours - timeInHours)/100);
    //     }
    // }

    let timeInHours = this.timeInEvents.find((e) => e.date === date).hour
    let timeOutHours = this.timeOutEvents.find((e) => e.date === date).hour
    hoursWorked = ((timeOutHours - timeInHours)/100);

    return hoursWorked
}

function wagesEarnedOnDate(date) {
    let hoursWorked = hoursWorkedOnDate.call(this, date);
    let pay = this.payPerHour
    let wagesEarned = (pay * hoursWorked)
    return wagesEarned
}

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName) {
    for (let employee of srcArray) {
        if (employee.firstName === firstName) {
            return employee;
        }
    }
}

function calculatePayroll(arrayOfEmployees) {
        let totalEmployeeWages = 0

    for(let employee of arrayOfEmployees) {
        let employeeWages = allWagesFor.call(employee);
        totalEmployeeWages += employeeWages;
    }
    return totalEmployeeWages
}
