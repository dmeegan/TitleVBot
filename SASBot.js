let designFlow = 6360
let trenchWidth = 2
let trenchHeight = 2 
let trenchLength = 60
let reserveAreaBetweenTrenches = 'No'

let percRate = 2
let soilClass = 'I'

// The following arrays show the long term acceptance rates (LTAR) for each soil class (SoilClass). The order of the terms in the arrays are based on the percolation rate (percRate).
let soilClassI = [0.74, 0.70, 0.68, 0.66, 'n/a', 'n/a', 'n/a', 'n/a', 'n/a', 'n/a', 'n/a', 'n/a']
let soilClassII = [0.60, 0.60, 0.60, 0.60, 0.60, 0.56, 0.53, 0.40, 0.33, 'n/a', 'n/a', 'n/a']
let soilClassIII = ['n/a', 'n/a', 'n/a', 'n/a', 0.37, 0.34, 0.33, 0.29, 0.25, 0.15]
let soilClassIV = ['n/a', 'n/a', 'n/a', 'n/a', 'n/a', 'n/a', 'n/a', 'n/a', 'n/a', 'n/a', 0.20, 0.15]

// The following if statement determines which long term acceptance rate (LTAR) in the soil class arrays to read
if (percRate < 5) {soilClassIterator = 0
} else if (percRate < 8){
    soilClassIterator = Math.ceil(percRate - 5)
} else if (percRate < 30){
    soilClassIterator = 3 + Math.ceil(((percRate - 8)/5))
} else if (percRate < 60){
    soilClassIterator = 8 + Math.ceil(((percRate - 30)/10))
}

// The following switch statement determines the LTAR using the percolation rate (percRate) and the soil class (soilClass)
switch (soilClass){
    case 'I':
        LTAR = soilClassI[soilClassIterator]
        break;
    case "II":
        LTAR = soilClassII[soilClassIterator]
        break;
    case "III":
        LTAR = soilClassIII[soilClassIterator]
        break;
    case "IV":
        LTAR = soilClassIV[soilClassIterator]
        break;
}

// The following function calculates the required surface area of the SAS (reqSasSurfArea) based on the Long term acceptance rate (LTAR) and the design flow (designFLow).
const reqSasSurfArea = () => designFlow / LTAR

// The following function calculates the surface area per linear foot of trench (trenchSurfaceAreaPerFoot) based on the trench hight (trenchHeight) and the trench width (trenchWidth).
const trenchSurfaceAreaPerFoot = () => 2 * trenchHeight + trenchWidth

// The following function calulcates the total surface area per trenc (trenchSurfaceArea) based on the surface area per linear foot (trenchSurfaceAreaPerFoot) and the trench length (trenchLength).
const trenchSurfaceArea = () => trenchSurfaceAreaPerFoot() * trenchLength

// The following function calculates the required number of trenches (trenchNum) to achieve the required total SAS surface area (reqSasSurfArea).
const trenchNum = () => Math.ceil(reqSasSurfArea() / trenchSurfaceArea())

// The following function calculates the provided overal surface area of the SAS (provSasSurfaceArea) based on the number of trenches provided (trenchNum) and the surface area per trench (trenchSurfaceArea).
const provSasSurfaceArea = () => trenchNum() * trenchSurfaceArea()

// The following function calculates the overall length of the SAS (sasAreaLength), which is the same as the trench length (trenchLength).
const sasAreaLength = () => trenchLength

switch (reserveAreaBetweenTrenches){
    case 'Yes':
       reqTrenchSeparation = 3 * trenchWidth;
       break;
    case 'No':
        reqTrenchSeparation = 2 * trenchWidth;
        break;
}

// The following function calculates the overall width of the SAS (sasAreaWidth) based on the number of trenches (trenchNum) and the trench width (trenchWidth).
const sasAreaWidth = () => trenchNum() * trenchWidth + (trenchNum() - 1) * reqTrenchSeparation

