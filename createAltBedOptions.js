
function createAltBedOptions() {
    document.getElementById('recLengthDiv').style.display = 'none';
    var altBed = document.getElementById("UserInput-altBed").value;
    switch (altBed) {
        case 'Yes':
            document.getElementById('recLengthDiv').style.display = 'block';
            break;
        case 'No':
            break;
    }
}

