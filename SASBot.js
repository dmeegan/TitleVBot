

function sasNetworkLayout() {

    const designFlow = +document.getElementById('UserInput-designFlow').value
    const sasAreaLength = +document.getElementById('UserInput-sasAreaLength').value
    const trenchWidth = +document.getElementById('UserInput-trenchWidth').value
    const trenchHeight = +document.getElementById('UserInput-trenchHeight').value
    const percRate = +document.getElementById('UserInput-percRate').value
    const soilClass = document.getElementById('UserInput-soilClass').value
    const reserveAreaBetweenTrenches = document.getElementById('UserInput-reserveAreaBetweenTrenches').value

    // The following arrays show the long term acceptance rates (LTAR) for each soil class (SoilClass). The order of the terms in the arrays are based on the percolation rate (percRate).
    let soilClassI = [0.74, 0.70, 0.68, 0.66, 'n/a', 'n/a', 'n/a', 'n/a', 'n/a', 'n/a', 'n/a', 'n/a']
    let soilClassII = [0.60, 0.60, 0.60, 0.60, 0.60, 0.56, 0.53, 0.40, 0.33, 'n/a', 'n/a', 'n/a']
    let soilClassIII = ['n/a', 'n/a', 'n/a', 'n/a', 0.37, 0.34, 0.33, 0.29, 0.25, 0.15]
    let soilClassIV = ['n/a', 'n/a', 'n/a', 'n/a', 'n/a', 'n/a', 'n/a', 'n/a', 'n/a', 'n/a', 0.20, 0.15]

    // The following if statement determines which long term acceptance rate (LTAR) in the soil class arrays to read
    if (percRate < 5) {
        soilClassIterator = 0
    } else if (percRate < 8) {
        soilClassIterator = Math.ceil(percRate - 5)
    } else if (percRate < 30) {
        soilClassIterator = 3 + Math.ceil(((percRate - 8) / 5))
    } else if (percRate < 60) {
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

    // The following function calculates the surface area per linear foot of trench (trenchSurfaceAreaPerFoot) based on the trench hight (trenchHeight) and the trench width (trenchWidth).
    const trenchSurfaceAreaPerFoot = () => 2 * trenchHeight + trenchWidth

    // The following function calulcates the total surface area per trenc (trenchSurfaceArea) based on the surface area per linear foot (trenchSurfaceAreaPerFoot) and the trench length (trenchLength).
    const trenchSurfaceArea = () => trenchSurfaceAreaPerFoot() * sasAreaLength

    // The following function calculates the required number of trenches (trenchNum) to achieve the required total SAS surface area (reqSasSurfArea).
    const trenchNum = () => Math.ceil((reqSasSurfArea() / trenchSurfaceArea()))

    // The following function calculates the provided overal surface area of the SAS (provSasSurfaceArea) based on the number of trenches provided (trenchNum) and the surface area per trench (trenchSurfaceArea).
    const provSasSurfaceArea = () => trenchNum() * trenchSurfaceArea()

    // The following function calculates the overall length of the SAS (sasAreaLength), which is the same as the trench length (trenchLength).
    const sasAreaLength = () => sasAreaLength

    switch (reserveAreaBetweenTrenches) {
        case 'Yes':
            reqTrenchSeparation = 3 * trenchWidth;
            break;
        case 'No':
            reqTrenchSeparation = 2 * trenchWidth;
            break;
    }

    // The following function calculates the overall width of the SAS (sasAreaWidth) based on the number of trenches (trenchNum) and the trench width (trenchWidth).
    const sasAreaWidth = () => trenchNum() * trenchWidth + (trenchNum() - 1) * reqTrenchSeparation

    var sasNetworkReportWindow = window.open("", "SAS Network Layout Report", "Width=500,height=500");
    sasNetworkReportWindow.document.write("For a soil class of " + soilClass + " and a percolation rate of " + percRate + " inches per hour, the long term acceptance rate (LTAR) is " + LTAR + " gallons per day per square foot.<br/>")
    sasNetworkReportWindow.document.write("For a design flow of " + designFlow + " gallons per day and a LTAR of " + LTAR + " gallons per day per square foot, the minimum required surface area of your SAS is " + reqSasSurfArea() + " square feet.<br/>")
    // sasNetworkReportWindow.document.write("For a trench width of " + trenchWidth + " and a trench height of " + trenchHeight + ", the surface area per linear foot of trench is " + trenchSurfaceAreaPerFoot() + ".<br/>")
    // sasNetworkReportWindow.document.write("For a trench surface area per foot of " + trenchSurfaceAreaPerFoot() + " and a trench length of " + trenchLength + ", the total surface area per trench is " + trenchSurfaceArea() + "square feet.<br/>")
    sasNetworkReportWindow.document.write("For a total surface area of " + trenchSurfaceArea() + " square feet per trench and a required minimum overall SAS surface area of " + reqSasSurfArea() + ", the minimum required number of trenches is " + trenchNum() + ".<br/>")
    sasNetworkReportWindow.document.write("If " + trenchNum() + " tranches are used, the overall provided surface area of your SAS is " + provSasSurfaceArea() + " square feet.<br/>")


    // sasNetworkReportWindow.document.write("For "+trenchLength+" long trenches. The minimum nuumber of trenches in your SAS area is"+trenchNum())
}


