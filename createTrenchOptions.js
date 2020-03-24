
function createTrenchOptions() {
    document.getElementById('trenchWidthDiv').style.display = 'none';
    document.getElementById('trenchHeightDiv').style.display = 'none';
    document.getElementById('reserveBetweenTrenchesDiv').style.display = 'none';
    document.getElementById('trenchSurfaceAreaDiv').style.display = 'none';
    document.getElementById('minTrenchNumDiv').style.display = 'none';
    document.getElementById('recTrenchNumDiv').style.display = 'none';
    var fieldOrTrenches = document.getElementById('UserInput-fieldOrTrenches').value;
    switch (fieldOrTrenches) {
        case 'Trenches':
            document.getElementById('trenchWidthDiv').style.display = 'block';
            document.getElementById('trenchHeightDiv').style.display = 'block';
            document.getElementById('reserveBetweenTrenchesDiv').style.display = 'block';
            document.getElementById('trenchSurfaceAreaDiv').style.display = 'block';
            document.getElementById('minTrenchNumDiv').style.display = 'block';
            document.getElementById('recTrenchNumDiv').style.display = 'block';
            break;
        case 'Field':
            break;
    }
}                