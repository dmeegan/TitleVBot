function validateTrenchWidth() {
    var trenchWidthValue = +document.getElementById('UserInput-trenchWidth').value
  if (trenchWidthValue < 2) {
    alert("Per Title V section 15.251, the minimum trench width shall be 2 feet");
  } else if (trenchWidthValue > 3) {
    alert("Per Title V section 15.251, the maximum trench width shall be 3 feet");
}
}