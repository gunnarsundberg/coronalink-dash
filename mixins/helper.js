/* Collection of helper functions */

/* Adds commas to make numbers pretty for displaying. */
export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function isLoaded(data) {
    if (data){
        return true
    }
    else {
        return false
    }
}

export function caseChartData(dailyData) {
    if (dailyData) {
        var newChartData = []
        for (var i=dailyData.length - 1; i >= 0 ; i--) {
            var newElement = [];    
            if (dailyData[i]['cases']) {
                newElement[0] = dailyData[i]['date']
                newElement[1] = dailyData[i]['cases']
            }
            else {
                var date = dailyData[i]['date'].toString()
                newElement[0] = date.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3")
                newElement[1] = dailyData[i]['positiveIncrease']
            }
            newChartData.push(newElement);
        }
        return newChartData
    }
    else {
        return null
    }
}

export function testingChartData(dailyData) {
    if (dailyData) {
        var newChartData = []
        for (var i=dailyData.length - 1; i >= 0 ; i--) {
            var newElement = [];    
            newElement[0] = dailyData[i]['date']
            newElement[1] = dailyData[i]['total_tested']
            newChartData.push(newElement);
        }
        return newChartData
    }
    else {
        return null
    }
}

export function compareCases(a, b) {
    if (a['cases'] > b['cases']) return -1;
    if (b['cases'] > a['cases']) return 1;

    return 0;
}

export function compareTests(a, b) {
    if (a['total_tested'] > b['total_tested']) return -1;
    if (b['total_tested'] > a['total_tested']) return 1;

    return 0;
}

export function compareWeighted(a, b) {
    if (a['weighted_tests'] > b['weighted_tests']) return -1;
    if (b['weighted_tests'] > a['weighted_tests']) return 1;

    return 0;
}

export function outbreakDateSort(a, b) {
    const aDate = new Date(a['date_of_outbreak'])
    const bDate = new Date(b['date_of_outbreak'])

    if (aDate < bDate) return -1;
    if (bDate < aDate) return 1;

    return 0;
}

export function getObjectRank(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return i+1;
        }
    }
    return null;
}

export function findObject(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return array[i];
        }
    }
    return null;
}

export function findObjectList(array, key, value) {
    var objects = []
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] == value) {
            objects.push(array[i])
        }
    }
    return objects;
}

export function findMinObject(array, key) {
    var min = null
    for (var i = 0; i < array.length; i++) {
        if (min === null | array[i][key] < min) {
            min = array[i][key]
        }
    }
    return min;
}

export function findMaxObject(array, key) {
    var max = null
    for (var i = 0; i < array.length; i++) {
        if (max === null | array[i][key] > max) {
            max = array[i][key]
        }
    }
    return max;
}

export function getObjectsAverage(array, key) {
    var sum = 0
    var i = 0
    for (i; i < array.length; i++) {
        sum += array[i][key]
    }
    return sum/i;
}

export function getFormattedDateString(date) {
    var day = date.getDate(), month = date.getMonth() + 1
    if (day < 10) {
        day = "0" + day
    }
    if (month < 10) {
        month = "0" + month
    }
    return date.getFullYear() + "-" + month + "-" + day
}

export function ordinalSuffixOf(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

export function percentChange(initialData, newData) {
    return ((((newData - initialData)/initialData) * 100).toFixed(1))
}

export function displacement(newData, initialData) {
    return newData - initialData
}