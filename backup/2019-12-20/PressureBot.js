const roughCoeff = 150
const perfDia = 0.375
const distalHead = 2.5
const latNum = 12
const latLength = 100
const perfSpacing = 2

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

console.log(latDia)