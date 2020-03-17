function createSoilClassOptions() {
    var percRate = +document.getElementById('UserInput-percRate').value
    document.getElementById("UserInput-soilClass").selectedIndex = '0'
    document.getElementById("UserInput-soilClass").options.item(1).setAttribute("style", "display:none");
    document.getElementById("UserInput-soilClass").options.item(2).setAttribute("style", "display:none");
    document.getElementById("UserInput-soilClass").options.item(3).setAttribute("style", "display:none");
    document.getElementById("UserInput-soilClass").options.item(4).setAttribute("style", "display:none");
    if (percRate <= 0) {
        document.getElementById("UserInput-soilClass").selectedIndex = '0'
        alert("Invalid Input: Your percolation rate should be a positive non-zero rate in inches per hour")
    } else if (percRate > 0 && percRate <= 8) {
        document.getElementById("UserInput-soilClass").selectedIndex = '1'
        document.getElementById("UserInput-soilClass").options.item(1).setAttribute("style", "display:initial");
        document.getElementById("UserInput-soilClass").options.item(2).setAttribute("style", "display:initial");
    } else if (percRate > 8 && percRate <= 10) {
        document.getElementById("UserInput-soilClass").selectedIndex = '2'
        document.getElementById("UserInput-soilClass").options.item(2).setAttribute("style", "display:initial");
    } else if (percRate > 10 && percRate <= 30) {
        document.getElementById("UserInput-soilClass").selectedIndex = '2'
        document.getElementById("UserInput-soilClass").options.item(2).setAttribute("style", "display:initial");
        document.getElementById("UserInput-soilClass").options.item(3).setAttribute("style", "display:initial");
    } else if (percRate > 30 && percRate <= 40) {
        document.getElementById("UserInput-soilClass").selectedIndex = '3'
        document.getElementById("UserInput-soilClass").options.item(3).setAttribute("style", "display:initial");
    } else if (percRate > 40 && percRate <= 60) {
        document.getElementById("UserInput-soilClass").selectedIndex = '3'
        document.getElementById("UserInput-soilClass").options.item(3).setAttribute("style", "display:initial");
        document.getElementById("UserInput-soilClass").options.item(4).setAttribute("style", "display:initial");
    } else if (percRate > 60) {
        alert("Invalid Input: Per Title V section 15.242, the maximum percolation rate is 60 inches per hour")
        document.getElementById("UserInput-soilClass").selectedIndex = '0'
        document.getElementById('UserInput-percRate').value = '';
    }
}