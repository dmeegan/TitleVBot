

function sasNetworkLayout() {

    const designFlow = +document.getElementById('UserInput-designFlow').value
    const fieldOrTrenches = document.getElementById('UserInput-fieldOrTrenches').value
    const sasAreaLength = +document.getElementById('UserInput-sasAreaLength').value
    const percRate = +document.getElementById('UserInput-percRate').value
    const soilClass = document.getElementById('UserInput-soilClass').value

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

        // The following function calulcates the total surface area per trenc (trenchSurfaceArea) based on the surface area per linear foot (trenchSurfaceAreaPerFoot) and the trench length (trenchLength).
        const trenchSurfaceArea = () => trenchSurfaceAreaPerFoot() * sasAreaLength

        // The following function calculates the required number of trenches (trenchNum) to achieve the required total SAS surface area (reqSasSurfArea).
        const trenchNum = () => Math.ceil((reqSasSurfArea() / trenchSurfaceArea()))

        switch (reserveAreaBetweenTrenches) {
            case 'Yes':
                reqTrenchSeparation = 3 * trenchWidth;
                break;
            case 'No':
                reqTrenchSeparation = 2 * trenchWidth;
                break;
        }

        // The following function calculates the overall width of the SAS (sasAreaWidth) based on the number of trenches (trenchNum) and the trench width (trenchWidth).
        const overallSasAreaWidthTrench = () => trenchNum() * trenchWidth + (trenchNum() - 1) * reqTrenchSeparation

        const provSasSurfaceAreaTrenches = () => trenchNum() * trenchSurfaceArea()

        document.getElementById('result-trenchSurfaceArea').value = trenchSurfaceArea();
        document.getElementById('result-trenchNum').value = trenchNum();
        document.getElementById('result-minimumSASAreaWidth').value = overallSasAreaWidthTrench();
        document.getElementById('result-providedSurfaceArea').value = provSasSurfaceAreaTrenches();  
    } else if (fieldOrTrenches == 'Field') {

        // The following function calculates the required width of the field (reqFieldWidth).
        const reqFieldWidth = () => Math.ceil(reqSasSurfArea() / sasAreaLength);

        const provSasSurfaceAreaField = () => reqFieldWidth() * sasAreaLength;

        // document.getElementById('minimumFieldWidthDiv').style.display = 'initial';
        document.getElementById('result-minimumSASAreaWidth').value = reqFieldWidth();
        document.getElementById('result-providedSurfaceArea').value = provSasSurfaceAreaField();
    }

    
}


