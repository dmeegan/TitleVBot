
function createTrenchOptions() {
    document.getElementById('trenchWidthDiv').style.display = 'none';
    document.getElementById('trenchHeightDiv').style.display = 'none';
    document.getElementById('reserveBetweenTrenchesDiv').style.display = 'none';
    document.getElementById('result-trenchSurfaceAreaDiv').style.display = 'none';
    document.getElementById('result-minTrenchNumDiv').style.display = 'none';
    document.getElementById('result-recTrenchNumDiv').style.display = 'none';
    var fieldOrTrenches = document.getElementById('UserInput-fieldOrTrenches').value;
    switch (fieldOrTrenches) {
        case 'Trenches':
            document.getElementById('trenchWidthDiv').style.display = 'block';
            document.getElementById('trenchHeightDiv').style.display = 'block';
            document.getElementById('reserveBetweenTrenchesDiv').style.display = 'block';
            document.getElementById('result-trenchSurfaceAreaDiv').style.display = 'block';
            document.getElementById('result-minTrenchNumDiv').style.display = 'block';
            document.getElementById('result-recTrenchNumDiv').style.display = 'block';
            break;
        case 'Field':
            break;
    }
}                