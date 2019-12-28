let designFlow = 5500
let sasWidth = 100
let sasLength = 130
let latSpacing = 5
let distalHead = 2.5
let perfDia = 0.25
let perfSpacing = 5
let roughCoeff = 150
let manifoldType = 'Center'
let trenchLength = 130
let trenchNum = 19
let trenchHeight = 2

// The following switch statement determines the total lateral length (latLength) based on whether the manifold is location in the center ('Center') or the end ('End') of the SAS.
switch (manifoldType){
    case 'Center':
        latLength = trenchLength / 2
        break;
    case 'End':
        latLength = trenchLength
        break;
}

// The following switch statement determines the total number of laterals (latNum) based on whether the manifold is location in the center ('Center') or the end ('End') of the SAS.
switch (manifoldType){
    case 'Center':
        latNum = 2 * trenchNum
        break;
    case 'End':
        latNum = trenchNum
        break;
}

// This function calculates the perforation discharge rate (perfDis) using the perforation diameter (perfDia) and in-line distal head (distalHead)
const perfDis = () => 11.79 * (Math.pow(perfDia,2)) * (Math.sqrt(distalHead))

// This function calucates the total number of perforations per lateral (perfNum) using the lateral length (latLength) and perforation spacing (perfSpacing)
const perfNum = () => Math.floor((latLength / perfSpacing))

// This function calculates the lateral discharge rate (Q) using the perforation discharge rate (perfDis) and the number of total number of perforations per lateral (N) */
const latDis = () => perfDis() * perfNum()

// The following switch statement determines the total discharge rate per trench (trenchDis) based on whether the manifold is location in the center ('Center') or the end ('End') of the SAS.
switch (manifoldType){
    case 'Center':
        trenchDis = 2 * latDis()
        break;
    case 'End':
        trenchDis = latDis()
        break;
}

// This function calculates the target headloss across the laterals, using the desired distal head
const latTargetHeadloss = () => 0.21 * distalHead

let latSizes = [1, 1.25, 1.5, 2, 3, 4]

let latDiaIterator = 0
let latDeltaHead = 0
do {
    let perfFlowIterator = 0
    let latSumHeadLoss = 0
    do {
       const latDownStreamFlow = () => perfDis() * (perfNum()-perfFlowIterator)
       const latHeadLoss = () => perfSpacing * Math.pow((3.55*latDownStreamFlow()) / (roughCoeff * (Math.pow((latSizes[latDiaIterator]),2.63))),1.85)
       latSumHeadLoss += latHeadLoss()
        perfFlowIterator++
        } while (perfFlowIterator < (perfNum()+1))
    const latPressureEndHeadLoss = () => perfSpacing * Math.pow((3.55*perfDis()*perfNum()) / (roughCoeff * (Math.pow((latSizes[latDiaIterator]),2.63))),1.85)
    latDeltaHead = latSumHeadLoss - latPressureEndHeadLoss()
    latDia = latSizes[latDiaIterator]
    latDiaIterator++
} while (latDeltaHead > latTargetHeadloss())



let maniFlowIterator = 0
let sumManiFrictionLoss = 0
do {
    const maniDownStreamFlow = () => trenchDis * (trenchNum-maniFlowIterator)
    const maniSegFrictionFactor = () => 0.00098 * Math.pow(maniDownStreamFlow(), 1.85)
    const maniSegFrictionLoss = () => latSpacing * maniSegFrictionFactor()  
    sumManiFrictionLoss += maniSegFrictionLoss()
    maniFlowIterator++
    } while (maniFlowIterator < trenchNum+1)

// The following function calulcates the total piping volume of that laterals (latPipingVolume) in gallons per DynamicsCompressorNode, based on the number of laterals, the lenght of laterals, and the height of the trenches+1 ft for the risers from the manifoldType.
const latPipingVolume = () => 7.48 * (Math.PI * Math.pow((latDia / 24),2) * trenchNum * (latLength+trenchHeight+1))

const minimumManiDia = () => Math.ceil(Math.pow((sumManiFrictionLoss / (0.1 * distalHead)) ,0.21))

const maniSizes = [1, 1.25, 1.5, 2, 3, 4, 5, 6, 8, 10, 12, 14, 16, 18]

// The following do while loop, chooses the nominal manifold size to use, based on the minimum manifold size (useManiDia) and the available nominal manifold sizes (maniSizes)
let maniSizeDifference = ''
let maniSizeIterator = 13
do {
    maniSizeDifference = maniSizes[maniSizeIterator] - minimumManiDia()
    useManiDia = maniSizes[maniSizeIterator]
    maniSizeIterator--
    } while (maniSizeDifference > 0) 


// The following function calulcates the total piping volume of that laterals (latPipingVolume) in gallons per DynamicsCompressorNode, based on the number of laterals, the lenght of laterals, and the height of the trenches+1 ft for the risers from the manifoldType.
const maniPipingVolume = () => 7.48 * Math.PI * Math.pow((useManiDia / 24),2) * trenchNum * latSpacing
console.log(maniPipingVolume())



console.log(latPipingVolume())
console.log(latDia)