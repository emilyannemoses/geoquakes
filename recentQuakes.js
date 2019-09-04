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
            const seconds = Math.round(utcMilliSeconds / 1000);
            const theTime = new Date(0);
            theTime.setUTCSeconds(seconds);
            const stringTime = theTime.toString()
            const splitStringTime = stringTime.split(' ')
            const newTime = `${splitStringTime[0]} ${splitStringTime[1]} ${splitStringTime[2]} ${splitStringTime[3]} ${splitStringTime[4]}`
            mostRecent.innerHTML += `
            <div class="terms">
                <hr></hr>
                    <h4>${eachQuake.properties.title}</h4>
                    <div>📈 ${eachQuake.properties.mag}</div>
                    <div>🌍 <a href="https://www.openstreetmap.org/#map=10/${eachQuake.geometry.coordinates[1]}/${eachQuake.geometry.coordinates[0]}" target="_blank">${eachQuake.properties.place}</a></div>
                    <div>🕔 ${newTime}</div>
                    <br></br>
                    <a href=${eachQuake.properties.url} target="_blank">See more detailed information about this earthquake on the USGS website.</a>
                <br></br>
            </div>
            `
        })
    });
}

getRecent.addEventListener('click', recentQuakes);