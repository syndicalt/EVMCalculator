const app = new Vue({
    el: "#app",
    data() {
        return {
            plannedWork: null,
            completedWork: null,
            remainingWork: null,
            workersNumber: null,
            currency: "$",
            humanHourCost: null,
            hoursPerWorkingDay: 8,
            decimalDigits: 0
        }
    },
    computed: {
        plannedCompletionPeriod() {
            return (+this.plannedWork / +this.hoursPerWorkingDay / +this.workersNumber) || 0
        },
        elapsedPeriod() {
            return (+this.completedWork / +this.hoursPerWorkingDay / +this.workersNumber) || 0
        },
        estimatedCompletionPeriod() {
            return (+this.plannedCompletionPeriod / +this.schedulePerformanceIndex) || 0
        },
        plannedCompletionPercentage() {
            return (+this.completedWork / +this.plannedWork) || 0
        },
        actualCompletionPercentage() {
            return (+this.completedWork / (+this.completedWork + +this.remainingWork)) || 0
        },
        budgetAtCompletion() {
            return (+this.plannedWork * +this.humanHourCost) || 0
        },
        plannedValue() {
            return (+this.budgetAtCompletion * +this.plannedCompletionPercentage) || 0
        },
        earnedValue() {
            return (+this.budgetAtCompletion * +this.actualCompletionPercentage) || 0
        },
        actualCost() {
            return (+this.completedWork * +this.humanHourCost) || 0
        },
        costVariance() {
            return (+this.earnedValue - +this.actualCost) || 0
        },
        scheduleVariance() {
            return (+this.earnedValue - +this.plannedValue) || 0
        },
        costPerformanceIndex() {
            return (+this.earnedValue / +this.actualCost) || 0
        },
        schedulePerformanceIndex() {
            return (this.earnedValue / +this.plannedValue) || 0
        },
        estimateAtCompletion() {
            return (+this.budgetAtCompletion / +this.costPerformanceIndex) || 0
        },
        estimateToComplete() {
            return (+this.estimateAtCompletion - +this.actualCost) || 0
        },
        varianceAtCompletion() {
            return (+this.budgetAtCompletion - +this.estimateAtCompletion) || 0
        }
    }
})

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function exportCSV() {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Planned Work,Completed Work,Remaining Work,Workers Number,Human Hour Cost,Hours Per Working Day,Planned Completion Period,Elapsed Period,Estimated Completion Period,Planned Completion Percentage,Actual Completion Percentage,Budget At Completion,Planned Value,Earned Value,Actual Cost,Cost Variance,Schedule Variance,Cost Performance Index,Schedule Performance Index,Estimate At Completion,Estimate To Complete,Variance At Completion\n";
    csvContent += `${app.plannedWork},${app.completedWork},${app.remainingWork},${app.workersNumber},${app.humanHourCost},${app.hoursPerWorkingDay},${app.plannedCompletionPeriod},${app.elapsedPeriod},${app.estimatedCompletionPeriod},${app.plannedCompletionPercentage},${app.actualCompletionPercentage},${app.budgetAtCompletion},${app.plannedValue},${app.earnedValue},${app.actualCost},${app.costVariance},${app.scheduleVariance},${app.costPerformanceIndex},${app.schedulePerformanceIndex},${app.estimateAtCompletion},${app.estimateToComplete},${app.varianceAtCompletion}\n`;
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    let date = new Date()
    link.setAttribute("download", `EVMCalculator_${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.csv`);
    document.body.append(link);
    link.click();
}