let designFlow = 5500
let sasWidth = 100
let sasLength = 130
let latSpacing = 8
let distalHead = 2.5
let perfDia = 0.375
let perfSpacing = 2
let roughCoeff = 150
let percRate = 15
let soilClass = 'II'

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

const sasSurfArea = () => designFlow / LTAR
const sasArea = () => sasWidth * sasLength
const latLength = () => sasLength / 2
const latNum = () => 2 * (sasWidth / latSpacing)

// This function calculates the perforation discharge rate (perfDis) using the perforation diameter (perfDia) and in-line distal head (distalHead)
const perfDis = () => 11.79 * (Math.pow(perfDia,2)) * (Math.sqrt(distalHead))

// This function calucates the total number of perforations per lateral (perfNum) using the lateral length (latLength) and perforation spacing (perfSpacing)
const perfNum = () => Math.floor(latLength / perfSpacing)

// This function calculates the lateral discharge rate (Q) using the perforation discharge rate (perfDis) and the number of total number of perforations per lateral (N) */
const latDis = () => perfDis() * perfNum()

// This function calculates the target headloss across the laterals, using the desired distal head
const latTargetHeadloss = () => 0.21 * distalHead

let latSizes = [1, 1.25, 1.5, 2, 3, 4]

let latDiaIterator = 0
let deltaHead = 0
do {
    let perfFlowIterator = 0
    let sumHead = 0
    do {
       const downStreamFlow = () => perfDis() * (perfNum()-perfFlowIterator)
       const latHeadLoss = () => perfSpacing * Math.pow((3.55*downStreamFlow()) / (roughCoeff * (Math.pow((latSizes[latDiaIterator]),2.63))),1.85)
       sumHead += latHeadLoss()
        perfFlowIterator++
        } while (perfFlowIterator < (perfNum()+1))
    const pressureEndHeadLoss = () => perfSpacing * Math.pow((3.55*perfDis()*perfNum()) / (roughCoeff * (Math.pow((latSizes[latDiaIterator]),2.63))),1.85)
    deltaHead = sumHead - pressureEndHeadLoss()
    latDia = latSizes[latDiaIterator]
    latDiaIterator++
} while (deltaHead > latTargetHeadloss())

// const maniLength = () => 
// let perfFlowIterator = 0
// let sumHead = 0
// do {
//     const maniSegFlow = () => latDis() * 
//     const maniSegFrictionFactor = () => 0.00098 * Math.pow(maniSegFlow(),1.85)
//     const maniDia = () => Math.pow(latSpacing() * maniSegFrictFactor() ,0.21)
//     perfFlowIterator++
//     } while (perfFlowIterator < (perfNum()+1))


console.log(latDia)