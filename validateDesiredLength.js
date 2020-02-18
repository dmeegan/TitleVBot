function validateDesiredLength() {
    var desiredLengthValue = +document.getElementById('UserInput-sasAreaLength').value
  if (desiredLengthValue <= 0) {
    alert("Invalid Input: Your desired SAS area length should be positive non-zero value in feet");
    document.getElementById('UserInput-sasAreaLength').value = ''
  } else if (desiredLengthValue > 100) {
    alert("Per Title V section 15.251 and 15.252, the maximum trench or field length shall be 100 feet);
    document.getElementById('UserInput-sasAreaLength').value = 100
}
}