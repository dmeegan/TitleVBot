
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
            document.getElementById('trenchWidthDiv').style.display = 'initial';
            document.getElementById('trenchHeightDiv').style.display = 'initial';
            document.getElementById('reserveBetweenTrenchesDiv').style.display = 'initial';
            document.getElementById('trenchSurfaceAreaDiv').style.display = 'initial';
            document.getElementById('minTrenchNumDiv').style.display = 'initial';
            document.getElementById('recTrenchNumDiv').style.display = 'initial';
            break;
        case 'Field':
            break;
    }
}                