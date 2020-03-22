function validateDesignFlow() {
  var designFlowValue = +document.getElementById('UserInput-designFlow').value
  if (designFlowValue <= 0) {
    alert("Invalid Input: Your dsign flow should be positive non-zero value in gallons per day");
    document.getElementById('UserInput-designFlow').value = '';
  }
}

// function validateFieldOrTrenches() {
//   var designFlowValue = +document.getElementById('UserInput-designFlow').value
//   var fieldOrTrenchesValue = document.getElementById("UserInput-fieldOrTrenches").value
//   if (designFlowValue >= 5000 && fieldOrTrenchesValue == 'Field') {
//     alert("Invalid Input: Per Title V section 15.252, the maximum design flow for bed or field configuration is 5,000 gallons per day");
//     document.getElementById("UserInput-fieldOrTrenches").value = 'Trenches';
//   }
// }



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

  if (latSpacing <= 0) {
    alert("Invalid Input: Your lateral spacing should be positive non-zero value in feet");
    document.getElementById('UserInput-latSpacing').value = ''
  }

  if (fieldOrTrenches == 'Trenches') {
    var trenchWidthValue = +document.getElementById('UserInput-trenchWidth').value
    var reserveBetweenTrenches = document.getElementById('UserInput-reserveAreaBetweenTrenches').value
    if (reserveBetweenTrenches == 'Yes') {
      typicalLatSpacing = (trenchWidthValue) + (3 * trenchWidthValue)
      alert("Your lateral spacing was outside ouf your trenches. I've adjusted it to be centered on your trenches");
      document.getElementById('UserInput-latSpacing').value = typicalLatSpacing
    } else if (reserveBetweenTrenches == 'No') {
      typicalLatSpacing = (trenchWidthValue) + (2 * trenchWidthValue)
      alert("Your lateral spacing was outside ouf your trenches. I've adjusted it to be centered on your trenches");
      document.getElementById('UserInput-latSpacing').value = typicalLatSpacing
    }
  } else if (fieldOrTrenches == 'Field' && latSpacing > 6) {
    alert("Invalid Input: Per Title V section 15.252, the maximum spacing between laterals in a field is 6 feet");
    document.getElementById('UserInput-latSpacing').value = 6
  }
}

function validateDistalHead() {
  var latSpacing = +document.getElementById('UserInput-distalHead').value
  if (latSpacing <= 0) {
    alert("Invalid Input: Your desired distal head should be positive non-zero value in feet");
    document.getElementById('UserInput-latSpacing').value = ''
  }
}

function validatePerfSpacing() {
  var perfSpacing = +document.getElementById('UserInput-perfSpacing').value
  if (perfSpacing <= 0) {
    alert("Invalid Input: Your desired perforation spacing should be positive non-zero value in feet");
    document.getElementById('UserInput-perfSpacing').value = '';
  } else if (perfSpacing > 5) {
    alert("Invalid Input: Per the Title V Pressure Distribution Guidance, the maximum spacing between perforations is 5 feet");
    document.getElementById('UserInput-perfSpacing').value = 5;
}
}

function validatePerfDia() {
  var perfDia = +document.getElementById('UserInput-perfDia').value
  if (perfDia < 0.125) {
    alert("Invalid Input: Per the Title V Pressure Distribution Guidance, the minimum perforation diameter is 0.125 inches (1/8 inch)");
    document.getElementById('UserInput-perfDia').value = 0.125;
  } else if (perfDia > 0.625) {
    alert("Invalid Input: Per the Title V Pressure Distribution Guidance, the maximum perforation diameter is 0.625 inches (5/8 inch)");
    document.getElementById('UserInput-perfDia').value = 0.625;
}
}

function clearPressureNetworkForm() {
  document.getElementById('UserInput-latSpacing').value = '';
  document.getElementById('UserInput-perfSpacing').value = '';
  document.getElementById('UserInput-perfDia').value = '';
  document.getElementById("UserInput-manifoldType").selectedIndex = '0';
  document.getElementById("UserInput-pipeMaterial").selectedIndex = '0';
  document.getElementById("UserInput-latSize").selectedIndex = '0';
  document.getElementById("UserInput-maniSize").selectedIndex = '0';

}