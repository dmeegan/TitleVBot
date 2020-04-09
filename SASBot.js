function sasNetworkLayout() {

    const designFlow = +document.getElementById('UserInput-designFlow').value
    const fieldOrTrenches = document.getElementById('UserInput-fieldOrTrenches').value
    const sasAreaLength = +document.getElementById('UserInput-sasAreaLength').value
    const percRate = +document.getElementById('UserInput-percRate').value
    const soilClass = document.getElementById('UserInput-soilClass').value
    const altBed = document.getElementById('UserInput-altBed').value

    // The following arrays show the long term acceptance rates (LTAR) for each soil class (SoilClass). The order of the terms in the arrays are based on the percolation rate (percRate).
    const soilClassI = [0.74, 0.70, 0.68, 0.66, 'n/a', 'n/a', 'n/a', 'n/a', 'n/a', 'n/a', 'n/a', 'n/a']
    const soilClassII = [0.60, 0.60, 0.60, 0.60, 0.60, 0.56, 0.53, 0.40, 0.33, 'n/a', 'n/a', 'n/a']
    const soilClassIII = ['n/a', 'n/a', 'n/a', 'n/a', 'n/a', 0.37, 0.34, 0.33, 0.29, 0.25, 0.20, 0.15]
    const soilClassIV = ['n/a', 'n/a', 'n/a', 'n/a', 'n/a', 'n/a', 'n/a', 'n/a', 'n/a', 'n/a', 0.20, 0.15]

    // The following if statement determines which long term acceptance rate (LTAR) in the soil class arrays to read
    if (percRate < 5) {
        soilClassIterator = 0
    } else if (percRate < 8) {
        soilClassIterator = Math.ceil(percRate - 5)
    } else if (percRate < 30) {
        soilClassIterator = 3 + Math.ceil(((percRate - 8) / 5))
    } else if (percRate <= 60) {
        soilClassIterator = 8 + Math.ceil(((percRate - 30) / 10))
    }

    // The following switch statement determines the LTAR using the percolation rate (percRate) and the soil class (soilClass)
    switch (soilClass) {
        case 'I':
            LTAR = soilClassI[soilClassIterator]
            break;
        case 'II':
            LTAR = soilClassII[soilClassIterator]
            break;
        case 'III':
            LTAR = soilClassIII[soilClassIterator]
            break;
        case 'IV':
            LTAR = soilClassIV[soilClassIterator]
            break;
    }

    // The following function calculates the required surface area of the SAS (reqSasSurfArea) based on the Long term acceptance rate (LTAR) and the design flow (designFLow).
    const reqSasSurfArea = () => Math.ceil((designFlow / LTAR))

    document.getElementById('result-LTAR').value = LTAR;
    document.getElementById('result-reqSasSurfArea').value = reqSasSurfArea();


    if (fieldOrTrenches == 'Trenches') {
        trenchWidth = +document.getElementById('UserInput-trenchWidth').value
        trenchHeight = +document.getElementById('UserInput-trenchHeight').value
        reserveAreaBetweenTrenches = document.getElementById('UserInput-reserveAreaBetweenTrenches').value


        // The following function calculates the surface area per linear foot of trench (trenchSurfaceAreaPerFoot) based on the trench hight (trenchHeight) and the trench width (trenchWidth).
        const trenchSurfaceAreaPerFoot = () => 2 * trenchHeight + trenchWidth

        // The following function calculates the total surface area per trench (trenchSurfaceArea) based on the surface area per linear foot (trenchSurfaceAreaPerFoot) and the trench length (trenchLength).
        const trenchSurfaceArea = () => trenchSurfaceAreaPerFoot() * sasAreaLength

        // The following function calculates the required number of trenches (minTrenchNum) to achieve the required total SAS surface area (reqSasSurfArea).
        const minTrenchNum = () => Math.ceil(reqSasSurfArea() / trenchSurfaceArea())


        switch (altBed) {
            case 'Yes':
                recTrenchNum = 2 * Math.ceil((reqSasSurfArea() / trenchSurfaceArea()) / 2);
                recTrenchLength = Math.ceil(reqSasSurfArea() / (recTrenchNum * trenchSurfaceAreaPerFoot()));
                recTrenchSurfaceArea = trenchSurfaceAreaPerFoot() * recTrenchLength
                break;
            case 'No':
                recTrenchNum = Math.ceil(minTrenchNum());
                recTrenchLength = Math.ceil(reqSasSurfArea() / (recTrenchNum * trenchSurfaceAreaPerFoot()));
                recTrenchSurfaceArea = trenchSurfaceAreaPerFoot() * recTrenchLength
                break;
        }

        document.getElementById('result-recLength').value = recTrenchLength;
        document.getElementById('result-recTrenchSurfaceArea').value = recTrenchSurfaceArea;

        switch (reserveAreaBetweenTrenches) {
            case 'Yes':
                reqTrenchSeparation = 3 * trenchWidth;
                break;
            case 'No':
                reqTrenchSeparation = 2 * trenchWidth;
                break;
        }



        // The following function calculates the overall width of the SAS (sasAreaWidth) based on the number of trenches (recTrenchNum) and the trench width (trenchWidth).
        const overallSasAreaWidthTrench = () => recTrenchNum * trenchWidth + (recTrenchNum - 1) * reqTrenchSeparation

        const provSasSurfaceAreaTrenches = () => recTrenchNum * recTrenchSurfaceArea;

        // document.getElementById('result-trenchSurfaceArea').value = trenchSurfaceArea();

        document.getElementById('result-minTrenchNum').value = minTrenchNum()

        switch (altBed) {
            case 'Yes':
                document.getElementById('result-recTrenchNum').value = recTrenchNum / 2;
                document.getElementById('result-minimumSASAreaWidth').value = overallSasAreaWidthTrench() / 2;
                document.getElementById('result-providedSurfaceArea').value = provSasSurfaceAreaTrenches();
                break;
            case 'No':
                document.getElementById('result-recTrenchNum').value = recTrenchNum;
                document.getElementById('result-minimumSASAreaWidth').value = overallSasAreaWidthTrench();
                document.getElementById('result-providedSurfaceArea').value = provSasSurfaceAreaTrenches();
                break;
        }

    } else if (fieldOrTrenches == 'Field') {

        // The following function calculates the required width of the field (reqFieldWidth).
        const reqFieldWidth = () => Math.ceil(reqSasSurfArea() / sasAreaLength);

        const provSasSurfaceAreaField = () => reqFieldWidth() * sasAreaLength;

        // document.getElementById('minimumFieldWidthDiv').style.display = 'initial';
        switch (altBed) {
            case 'Yes':
                document.getElementById('result-minimumSASAreaWidth').value = reqFieldWidth() / 2;
                break;
            case 'No':
                document.getElementById('result-minimumSASAreaWidth').value = reqFieldWidth();
                break;
        }
        document.getElementById('result-recLength').value = sasAreaLength;
        document.getElementById('result-providedSurfaceArea').value = provSasSurfaceAreaField();
    }
}

function clearSasNetworkLayout() {
    document.getElementById('UserInput-designFlow').value = '';
    document.getElementById('UserInput-fieldOrTrenches').value = '';
    document.getElementById('UserInput-sasAreaLength').value = '';
    document.getElementById('UserInput-percRate').value = '';
    document.getElementById('UserInput-soilClass').value = '';
    document.getElementById('UserInput-altBed').value = '';

    document.getElementById('result-LTAR').value = '';
    document.getElementById("result-reqSasSurfArea").value = '';
    document.getElementById('result-recTrenchNum').value = '';
    document.getElementById('result-minimumSASAreaWidth').value = '';
    document.getElementById('result-providedSurfaceArea').value = '';
    document.getElementById('result-recLength').value = '';
    document.getElementById('result-recTrenchSurfaceArea').value = '';

    document.getElementById("UserInput-soilClass").selectedIndex = '0'
    document.getElementById("UserInput-soilClass").options.item(1).setAttribute("style", "display:none");
    document.getElementById("UserInput-soilClass").options.item(2).setAttribute("style", "display:none");
    document.getElementById("UserInput-soilClass").options.item(3).setAttribute("style", "display:none");
    document.getElementById("UserInput-soilClass").options.item(4).setAttribute("style", "display:none");

    document.getElementById('trenchWidthDiv').style.display = 'none';
    document.getElementById('trenchHeightDiv').style.display = 'none';
    document.getElementById('reserveBetweenTrenchesDiv').style.display = 'none';
    document.getElementById('trenchSurfaceAreaDiv').style.display = 'none';
    document.getElementById('minTrenchNumDiv').style.display = 'none';
    document.getElementById('recTrenchNumDiv').style.display = 'none';
}