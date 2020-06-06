
export function getZipData() {
    var zipUrl = "https://data.cityofchicago.org/resource/yhhz-zm2v.json";

    return fetch(zipUrl)
        .then((resonse) => {
            return resonse.json();
        }).then((data) => {
            return data;
        });
}

export function getAgeData() {
    var ageUrl = "https://data.cityofchicago.org/resource/naz8-j4nc.json";

    return fetch(ageUrl)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return data
        });
}

export function getNewsData(){
    return fetch('https://gnews.io/api/v3/search?q=chicago%20coronavirus&image=required&token=5decfe986025127212ad9ae685327f91')
        .then(resp => resp.json())
        .then(data => data);
}