let countryArray = [];
let stateArray = [];
let cityArray = [];

async function getCountryDetail(){
    console.log("country detail fetched...");
    const respCountry = await fetch('https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries.json').then(r => {
        return r.json();
    });
    countryArray = respCountry;

    const respState = await fetch('https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/states.json').then(r => {
        return r.json();
    });
    stateArray = respState;

    const respCity = await fetch('https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/cities.json').then(r => {
        return r.json();
    });
    cityArray = respCity;

    const el = document.getElementById("country");
    countryArray?.forEach(d => {
        el.innerHTML += 
        `<tr>
            <td onclick='getStateDetail(${d?.id})'>${d?.name}</td>
        </tr>
        `
    });
}

async function getStateDetail(countryId){
    console.log("state detail fetched...");
    const stateArrayFinal = stateArray.filter(d => d?.country_id === countryId);
    console.log("stateArray--->",stateArray);

    const el = document.getElementById("state");
    el.innerHTML = 
        `
        <tr>
            <th>State</th>
        </tr>
        `;
    const el2 = document.getElementById("city");
    el2.innerHTML =
        `
        <tr>
            <th>City</th>
        </tr>
        `;
    stateArrayFinal?.forEach(d => {
        el.innerHTML += 
        `<tr>
            <td onclick='getCityDetail(${countryId},${d?.id})'>${d?.name}</td>
        </tr>
        `
    });
}

async function getCityDetail(countryId, stateId){
    console.log("city detail fetched...",countryId,stateId);
    const cityArrayFinal = cityArray.filter(d => d?.country_id === countryId && d?.state_id === stateId);
    console.log("cityArray--->",cityArray);
    
    const el = document.getElementById("city");
    el.innerHTML =
    `
    <tr>
        <th>City</th>
    </tr>
    `;
    cityArrayFinal?.forEach(d => {
        el.innerHTML += 
        `<tr>
            <td onclick='getCityDetail(${d?.id})'>${d?.name}</td>
        </tr>
        `
    });
}

function filter(){
    const value = document.getElementById("val").value;
    console.log("value",value)
    let filteredArr = countryArray.filter(d => {
        // console.log("d---",d.name.common.toLowerCase(),value.toLowerCase());
        return d.name.toLowerCase().includes(value.toLowerCase());
    });
    console.log("filteredArr---->",filteredArr);
    if(filteredArr.length > 0){
        const el = document.getElementById("country");
        el.innerHTML = 
        `
            <tr>
                <th>Country</th>
            </tr>
        `;
        filteredArr?.forEach(d => {
            el.innerHTML += 
            `<tr>
                <td onclick='getStateDetail(${d?.id})'>${d?.name}</td>
            </tr>
            `
        });
    }
}

