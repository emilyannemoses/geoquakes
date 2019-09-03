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
            const utcMilliSeconds = eachQuake.properties.time;
            let theTime = new Date(0);
            theTime.setUTCMilliseconds(utcMilliSeconds);
            mostRecent.innerHTML += `
            <div class="terms">
                <hr></hr>
                    <h5>${eachQuake.properties.title}</h5>
                    <div>MAP: <a href="https://www.openstreetmap.org/#map=10/${eachQuake.geometry.coordinates[1]}/${eachQuake.geometry.coordinates[0]}" target="_blank">${eachQuake.properties.place}</a></div>
                    <div>${theTime}</div>
                    MAGNITUDE ${eachQuake.properties.mag}<br>
                    <a href=${eachQuake.properties.url} target="_blank">More detailed information about this earthquake on USGS website.</a>
                <br></br>
            </div>
            `
        })
    });
}

getRecent.addEventListener('click', recentQuakes);