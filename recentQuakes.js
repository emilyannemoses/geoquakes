function recentQuakes() {
    // Date formatting
    const date = new Date()
    const year = date.getFullYear()
    let monthVal = date.getMonth()
    const monthMap = {
        0: '01',
        1: '02',
        2: '03',
        3: '04',
        4: '05',
        5: '06',
        6: '07',
        7: '08',
        8: '09',
        9: '10',
        10: '11',
        11: '12'
    }
    const month = monthMap[monthVal]
    let day = date.getDate()
    if(day < 10) {
        day = '0' + day;
    }
    const startDate = `${year}-${month}-${day}`
    const nextMonth = monthMap[monthVal+1]
    const endDate = `${year}-${nextMonth}-${day}`

    // USGS Earthquake API
    fetch(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${startDate}&endtime=${endDate}&minmagnitude=2`)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        const dataArray = data.features;
        const mostRecent = document.getElementById('mostRecent');
        dataArray.map(function(earthquake) {
            const eachQuake = earthquake
            mostRecent.innerHTML += `
            <hr></hr>
                ${eachQuake.properties.title}<br>
                ${eachQuake.properties.place}<br>
                ${eachQuake.properties.mag}
            <br></br>
            `
        })
    });
}

getRecent.addEventListener('click', recentQuakes);