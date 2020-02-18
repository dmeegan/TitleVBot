function createTrenchOptions() {
    document.getElementById('trenchWidthDiv').innerHTML = '';
    document.getElementById('trenchHeightDiv').innerHTML = '';
    document.getElementById('reserveBetweenTrenchesDiv').innerHTML = '';
    document.getElementById('trenchWidthDiv').style.padding ="";
        document.getElementById('trenchHeightDiv').style.padding="";
        document.getElementById('reserveBetweenTrenchesDiv').style.padding="";
    var fieldOrTrenches = document.getElementById('UserInput-fieldOrTrenches').value;
    switch (fieldOrTrenches) {
        case 'Trenches': 
        document.getElementById('trenchWidthDiv').innerHTML = ('Trench Width: <input type="number" id="UserInput-trenchWidth" required placeholder="feet" onblur="validateTrenchWidth()" min="2" max="3"><br>');
        document.getElementById('trenchHeightDiv').innerHTML = ('Trench Height: <input type="number" id="UserInput-trenchHeight" required placeholder="feet" min="0.5" max="2"><br>');
        document.getElementById('reserveBetweenTrenchesDiv').innerHTML = ('Is the reserve area between the trenches? : <select type="text" id="UserInput-reserveAreaBetweenTrenches" tabindex="2"> <br> </br> <option value="Yes"> Yes </option> <option value="No"> No </option> </select> <br>');
        document.getElementById('trenchWidthDiv').style.padding ="5px";
        document.getElementById('trenchHeightDiv').style.padding="5px";
        document.getElementById('reserveBetweenTrenchesDiv').style.padding="5px";
        break;
        case 'Field':
        break;
    }
}                