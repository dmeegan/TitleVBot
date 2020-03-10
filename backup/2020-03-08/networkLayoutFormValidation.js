function validateDesignFlow() {
  var designFlowValue = +document.getElementById('UserInput-designFlow').value
  if (designFlowValue <= 0) {
    alert("Invalid Input: Your dsign flow should be positive non-zero value in gallons per day");
    document.getElementById('UserInput-designFlow').value = '';
  }
}

function validateTrenchWidth() {
  var trenchWidthValue = +document.getElementById('UserInput-trenchWidth').value
  if (trenchWidthValue < 2) {
    alert("Invalid Input: Per Title V section 15.251, the minimum trench width shall be 2 feet");
    document.getElementById('UserInput-trenchWidth').value = 2;
  } else if (trenchWidthValue > 3) {
    alert("Invalid Input: Per Title V section 15.251, the maximum trench width shall be 3 feet");
    document.getElementById('UserInput-trenchWidth').value = 3;
  }
}

function validateTrenchHeight() {
  var trenchHeightValue = +document.getElementById('UserInput-trenchHeight').value
  if (trenchHeightValue < 0.5) {
    alert("Invalid Input: Per Title V section 15.251, the minimum trench width shall be 0.5 feet");
    document.getElementById('UserInput-trenchHeight').value = 0.5
  } else if (trenchHeightValue > 2) {
    alert("Invalid Input: Per Title V section 15.251, the maximum trench width shall be 2 feet");
    document.getElementById('UserInput-trenchHeight').value = 2
  }
}

function validateDesiredLength() {
  var desiredLengthValue = +document.getElementById('UserInput-sasAreaLength').value
  if (desiredLengthValue <= 0) {
    alert("Invalid Input: Your desired SAS area length should be positive non-zero value in feet");
    document.getElementById('UserInput-sasAreaLength').value = ''
  } else if (desiredLengthValue > 100) {
    alert("Invalid Input: Per Title V section 15.251 and 15.252, the maximum trench or field length shall be 100 feet");
    document.getElementById('UserInput-sasAreaLength').value = 100
  }
}

function validateLatSpacing() {
  var latSpacing = +document.getElementById('UserInput-latSpacing').value
  var fieldOrTrenches = document.getElementById('UserInput-fieldOrTrenches').value

  if (fieldOrTrenches == 'Trenches') {
    var trenchWidthValue = +document.getElementById('UserInput-trenchWidth').value
    var reserveBetweenTrenches = document.getElementById('UserInput-reserveAreaBetweenTrenches').value
    if (reserveBetweenTrenches == 'Yes') {
      typicalLatSpacing = (trenchWidthValue) + (3 * trenchWidthValue)
      document.getElementById('UserInput-latSpacing').value = typicalLatSpacing
    } else if (reserveBetweenTrenches == 'No') {
      typicalLatSpacing = (trenchWidthValue) + (2 * trenchWidthValue)
      document.getElementById('UserInput-latSpacing').value = typicalLatSpacing
    }
  } else if (fieldOrTrenches == 'Field') {
    if (latSpacing <= 0) {
      alert("Invalid Input: Your lateral spacing should be positive non-zero value in feet");
      document.getElementById('UserInput-latSpacing').value = ''
    } else if (latSpacing > 6) {
      alert("Invalid Input: Per Title V section 15.252, the maximum spacing between laterals in a field is 6 feet");
      document.getElementById('UserInput-latSpacing').value = 6
    }
  }
}