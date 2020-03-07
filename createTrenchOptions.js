function createTrenchOptions() {
    document.getElementById('trenchWidthDiv').style.display = 'none';
    document.getElementById('trenchHeightDiv').style.display = 'none';
    document.getElementById('reserveBetweenTrenchesDiv').style.display = 'none';
    var fieldOrTrenches = document.getElementById('UserInput-fieldOrTrenches').value;
    switch (fieldOrTrenches) {
        case 'Trenches':
            document.getElementById('trenchWidthDiv').style.display = 'initial';
            document.getElementById('trenchHeightDiv').style.display = 'initial';
            document.getElementById('reserveBetweenTrenchesDiv').style.display = 'initial';
            break;
        case 'Field':
            break;
    }
}                