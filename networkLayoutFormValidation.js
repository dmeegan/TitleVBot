function validateTrenchWidth() {
    var trenchWidthValue = +document.getElementById('UserInput-trenchWidth').value
  if (trenchWidthValue < 2) {
    alert("Per Title V section 15.251, the minimum trench width shall be 2 feet");
  } else if (trenchWidthValue > 3) {
    alert("Per Title V section 15.251, the maximum trench width shall be 3 feet");
}
}

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

function validateDesiredLength() {
    var desiredLengthValue = +document.getElementById('UserInput-sasAreaLength').value
  if (desiredLengthValue <= 0) {
    alert("Invalid Input: Your desired SAS area length should be positive non-zero value in feet");
    document.getElementById('UserInput-sasAreaLength').value = ''
  } else if (desiredLengthValue > 100) {
    alert("Per Title V section 15.251 and 15.252, the maximum trench or field length shall be 100 feet");
    document.getElementById('UserInput-sasAreaLength').value = 100
}
}