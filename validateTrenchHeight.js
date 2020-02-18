function validateTrenchHeight() {
    var trenchHeightValue = +document.getElementById('UserInput-trenchHeight').value
  if (trenchHeightValue < 0.5) {
    alert("Per Title V section 15.251, the minimum trench width shall be 0.5 feet");
    document.getElementById('UserInput-trenchHeight').value = 0.5
  } else if (trenchHeightValue > 2) {
    alert("Per Title V section 15.251, the maximum trench width shall be 2 feet");
    document.getElementById('UserInput-trenchHeight').value = 2
}
}