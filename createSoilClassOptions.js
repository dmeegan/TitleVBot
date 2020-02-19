function createSoilClassOptions() {
    document.getElementById("UserInput-soilClass").length = 0
    var percRate = +document.getElementById('UserInput-percRate').value
    if (percRate <= 0) {
    alert ("Invalid Input: Your percolation rate should be a positive non-zero rate in inches per hour")
    } else if (percRate > 0 && percRate <= 8) {
        var scO1 = document.createElement("OPTION");
        scO1.setAttribute("value", 'I');
        var scTN1 = document.createTextNode("I");
        scO1.appendChild(scTN1);
        document.getElementById("UserInput-soilClass").appendChild(scO1);
        var scO2 = document.createElement("OPTION");
        scO2.setAttribute("value", 'II');
        var scTN2 = document.createTextNode("II");
        scO2.appendChild(scTN2);
        document.getElementById("UserInput-soilClass").appendChild(scO2);
    } else if (percRate > 8 && percRate <= 10) {
        var scO2 = document.createElement("OPTION");
        scO2.setAttribute("value", 'II');
        var scTN2 = document.createTextNode("II");
        scO2.appendChild(scTN2);
        document.getElementById("UserInput-soilClass").appendChild(scO2);
    } else if (percRate > 10 && percRate <= 30) {
        var scO2 = document.createElement("OPTION");
        scO2.setAttribute("value", 'II');
        var scTN2 = document.createTextNode("II");
        scO2.appendChild(scTN2);
        document.getElementById("UserInput-soilClass").appendChild(scO2);
        var scO3 = document.createElement("OPTION");
        scO3.setAttribute("value", 'III');
        var scTN3 = document.createTextNode("III");
        scO3.appendChild(scTN3);
        document.getElementById("UserInput-soilClass").appendChild(scO3);
    } else if (percRate > 30 && percRate <= 40) {  
        var scO3 = document.createElement("OPTION");
        scO3.setAttribute("value", 'III');
        var scTN3 = document.createTextNode("III");
        scO3.appendChild(scTN3);
        document.getElementById("UserInput-soilClass").appendChild(scO3);
    } else if (percRate > 40 && percRate <= 60) {
        var scO3 = document.createElement("OPTION");
        scO3.setAttribute("value", 'III');
        var scTN3 = document.createTextNode("III");
        scO3.appendChild(scTN3);
        document.getElementById("UserInput-soilClass").appendChild(scO3);
        var scO4 = document.createElement("OPTION");
        scO4.setAttribute("value", 'IV');
        var scTN4 = document.createTextNode("IV");
        scO4.appendChild(scTN4);
        document.getElementById("UserInput-soilClass").appendChild(scO4);
    } else if (percRate < 60) {
        alert ("Invalid Input: Per Title V section 15.242, the maximum percolation rate is 60 inches per hour")
    }

}