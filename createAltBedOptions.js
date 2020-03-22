
function createAltBedOptions() {
    document.getElementById('recLengthDiv').style.display = 'none';
    var altBed = document.getElementById("UserInput-altBed").value;
    switch (altBed) {
        case 'Yes':
            document.getElementById('recLengthDiv').style.display = 'initial';
            break;
        case 'No':
            break;
    }
}

