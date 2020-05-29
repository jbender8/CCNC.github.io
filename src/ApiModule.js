
export function getZipData(somefunc) {
    var zipUrl = "https://data.cityofchicago.org/resource/yhhz-zm2v.json";

    return fetch(zipUrl)
        .then((resonse) => {
            return resonse.json();
        }).then((data) => {
            return data;
        });
}

export function getAgeData(somefunc) {
    var ageUrl = "https://data.cityofchicago.org/resource/naz8-j4nc.json";

    return fetch(ageUrl)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return data
        });
}
