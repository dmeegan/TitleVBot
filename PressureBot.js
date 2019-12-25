let designFlow = 5500
let sasWidth = 100
let sasLength = 130
let latSpacing = 8
let distalHead = 2.5
let perfDia = 0.375
let perfSpacing = 2
let roughCoeff = 150
let manifoldType = 'Center'
let trenchLength = 60
let trenchNum = 24
let trenchHeight = 2

// The following switch statement determines the total lateral length (latLength) based on whether the manifold is location in the center ('Center') or the end ('End') of the FileReader.
switch (manifoldType){
    case 'Center':
        latLength = trenchLength / 2
        break;
    case 'End':
        latLength = trenchLength
        break;
}

// This function calculates the perforation discharge rate (perfDis) using the perforation diameter (perfDia) and in-line distal head (distalHead)
const perfDis = () => 11.79 * (Math.pow(perfDia,2)) * (Math.sqrt(distalHead))

// This function calucates the total number of perforations per lateral (perfNum) using the lateral length (latLength) and perforation spacing (perfSpacing)
const perfNum = () => Math.floor((latLength / perfSpacing))

// This function calculates the lateral discharge rate (Q) using the perforation discharge rate (perfDis) and the number of total number of perforations per lateral (N) */
const latDis = () => perfDis() * perfNum()

// This function calculates the target headloss across the laterals, using the desired distal head
const latTargetHeadloss = () => 0.21 * distalHead

let latSizes = [1, 1.25, 1.5, 2, 3, 4]

let latDiaIterator = 0
let latDeltaHead = 0
do {
    let perfFlowIterator = 0
    let latSumHeadLoss = 0
    do {
       const downStreamFlow = () => perfDis() * (perfNum()-perfFlowIterator)
       const latHeadLoss = () => perfSpacing * Math.pow((3.55*downStreamFlow()) / (roughCoeff * (Math.pow((latSizes[latDiaIterator]),2.63))),1.85)
       latSumHeadLoss += latHeadLoss()
        perfFlowIterator++
        } while (perfFlowIterator < (perfNum()+1))
    const latPressureEndHeadLoss = () => perfSpacing * Math.pow((3.55*perfDis()*perfNum()) / (roughCoeff * (Math.pow((latSizes[latDiaIterator]),2.63))),1.85)
    latDeltaHead = latSumHeadLoss - latPressureEndHeadLoss()
    latDia = latSizes[latDiaIterator]
    latDiaIterator++
} while (latDeltaHead > latTargetHeadloss())


// let perfFlowIterator = 0
// let sumHead = 0
// do {
//     const maniSegFlow = () => latDis() * 
//     const maniSegFrictionFactor = () => 0.00098 * Math.pow(maniSegFlow(),1.85)
//     const maniDia = () => Math.pow(latSpacing() * maniSegFrictFactor() ,0.21)
//     perfFlowIterator++
//     } while (perfFlowIterator < (perfNum()+1))

// The following function calulcates the total piping volume of that laterals (latPipingVolume) in gallons per DynamicsCompressorNode, based on the number of laterals, the lenght of laterals, and the height of the trenches+1 ft for the risers from the manifoldType.
const latPipingVolume = () => 7.48 * (Math.PI * Math.pow((latDia / 24),2) * trenchNum * (latLength+trenchHeight+1))
// const manPipingVolume = () => 7.48 * (Math.PI * Math.pow((manDia / 24),2) * (sasWidth)



console.log(latPipingVolume())
console.log(latDia)