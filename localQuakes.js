function localQuakes() {
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

    // HTML5 Browser Location API
    locating.href = '';
    coordinates.textContent = '';
    map.textContent = '';
    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        locating.textContent = '';
        map.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`
        map.target = '_blank';
        map.innerText = 'Click to see the map of your location!';
        coordinates.textContent = `Latitude: ${latitude}°, Longitude: ${longitude}°`;
    
        // USGS Earthquake API
        fetch(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${startDate}&endtime=${endDate}&latitude=${latitude}&longitude=${longitude}&maxradius=15`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            const dataArray = data.features;
            const quake = document.getElementById('fetchIt')
            dataArray.map(function(earthquake) {
                const eachQuake = earthquake;
                const utcMilliSeconds = eachQuake.properties.time;
                let theTime = new Date(0);
                theTime.setUTCMilliseconds(utcMilliSeconds);
                quake.innerHTML += `
                <div class="terms">
                <hr></hr>
                    <h4>${eachQuake.properties.title}</h4>
                    <div>🌍&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://www.openstreetmap.org/#map=10/${eachQuake.geometry.coordinates[1]}/${eachQuake.geometry.coordinates[0]}" target="_blank">${eachQuake.properties.place}</a></div>
                    <div>🕔&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;${theTime}</div>
                    <div>📈&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;${eachQuake.properties.mag}</div>
                    <br></br>
                    <a href=${eachQuake.properties.url} target="_blank">See more detailed information about this earthquake on the USGS website.</a>
                <br></br>
            </div>
                `
            })
        });
    }
    function error() {
        locating.textContent = 'You must be good at hide and seek!'
    }
    if(!navigator.geolocation) {
        locating.textContent = 'For the love of all that is good, please cease use of Internet Explorer!';
    } else {
        locating.textContent = 'The satellites are currently triangulating to calculate your exact position on Planet Earth';
        navigator.geolocation.getCurrentPosition(success, error);
    }
}

getLocation.addEventListener('click', localQuakes);