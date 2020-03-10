function createLatSizeOptions() {

    const perfDia = +document.getElementById('UserInput-perfDia').value
    const manifoldType = document.getElementById('UserInput-manifoldType').value
    const distalHead = +document.getElementById('UserInput-distalHead').value
    const sasAreaLength = +document.getElementById("UserInput-sasAreaLength").value
    const sasAreaWidth = +document.getElementById('result-minimumSASAreaWidth').value
    const latSpacing = +document.getElementById("UserInput-latSpacing").value
    const pipeMaterial = document.getElementById("UserInput-pipeMaterial").value
    const perfSpacing = +document.getElementById("UserInput-perfSpacing").value

    // The following switch statement determines the total lateral length (latLength) based on whether the manifold is location in the center ('Center') or the end ('End') of the SAS.
    switch (pipeMaterial) {
        case 'pvc':
            roughCoeff = 140
            break;
        case 'abs':
            roughCoeff = 130
            break;
        case 'hdpe':
            roughCoeff = 140
            break;
    }

    // The following switch statement determines the total lateral length (latLength) based on whether the manifold is location in the center ('Center') or the end ('End') of the SAS.
    switch (manifoldType) {
        case 'Center':
            latLength = sasAreaLength / 2
            break;
        case 'End':
            latLength = sasAreaLength
            break;
    }

    // The following switch statement determines the total number of laterals (latNum) based on whether the manifold is location in the center ('Center') or the end ('End') of the SAS.
    switch (manifoldType) {
        case 'Center':
            latNum = 2 * (sasAreaWidth / latSpacing)
            break;
        case 'End':
            latNum = (sasAreaWidth / latSpacing)
            break;
    }


    // This function calculates the perforation discharge rate (perfDis) using the perforation diameter (perfDia) and in-line distal head (distalHead)
    const perfDis = () => 11.79 * (Math.pow(perfDia, 2)) * (Math.sqrt(distalHead))

    // This function calucates the total number of perforations per lateral (perfNum) using the lateral length (latLength) and perforation spacing (perfSpacing)
    const perfNum = () => Math.floor((latLength / perfSpacing))

    // This function calculates the target headloss across the laterals, using the desired distal head
    const latTargetHeadloss = () => 0.21 * distalHead

    let latSizes = [1, 1.25, 1.5, 2, 3, 4]

    let latDiaIterator = 0
    let latDeltaHead = 0
    do {
        let perfFlowIterator = 0
        let latSumHeadLoss = 0
        do {
            const latDownStreamFlow = () => perfDis() * (perfNum() - perfFlowIterator)
            const latHeadLoss = () => perfSpacing * Math.pow((3.55 * latDownStreamFlow()) / (roughCoeff * (Math.pow((latSizes[latDiaIterator]), 2.63))), 1.85)
            latSumHeadLoss += latHeadLoss()
            perfFlowIterator++
        } while (perfFlowIterator < (perfNum() + 1))
        const latPressureEndHeadLoss = () => perfSpacing * Math.pow((3.55 * perfDis() * perfNum()) / (roughCoeff * (Math.pow((latSizes[latDiaIterator]), 2.63))), 1.85)
        latDeltaHead = latSumHeadLoss - latPressureEndHeadLoss()
        minimumLatDia = latSizes[latDiaIterator]
        latDiaIterator++
    } while (latDeltaHead > latTargetHeadloss())

    // document.getElementById("UserInput-latSize").selectedIndex = '0'
    document.getElementById("UserInput-latSize").options.item(1).setAttribute("style", "display:none");
    document.getElementById("UserInput-latSize").options.item(2).setAttribute("style", "display:none");
    document.getElementById("UserInput-latSize").options.item(3).setAttribute("style", "display:none");
    document.getElementById("UserInput-latSize").options.item(4).setAttribute("style", "display:none");
    document.getElementById("UserInput-latSize").options.item(5).setAttribute("style", "display:none");
    document.getElementById("UserInput-latSize").options.item(6).setAttribute("style", "display:none");
    
    switch (minimumLatDia) {
        case 1:
        // document.getElementById("UserInput-latSize").selectedIndex = '1'
        document.getElementById("UserInput-latSize").options.item(1).setAttribute("style", "display:initial");
        document.getElementById("UserInput-latSize").options.item(2).setAttribute("style", "display:initial");
        document.getElementById("UserInput-latSize").options.item(3).setAttribute("style", "display:initial");
        document.getElementById("UserInput-latSize").options.item(4).setAttribute("style", "display:initial");
        document.getElementById("UserInput-latSize").options.item(5).setAttribute("style", "display:initial");
        document.getElementById("UserInput-latSize").options.item(6).setAttribute("style", "display:initial");
        break;
        case 1.25:
        // document.getElementById("UserInput-latSize").selectedIndex = '2'
        document.getElementById("UserInput-latSize").options.item(2).setAttribute("style", "display:initial");
        document.getElementById("UserInput-latSize").options.item(3).setAttribute("style", "display:initial");
        document.getElementById("UserInput-latSize").options.item(4).setAttribute("style", "display:initial");
        document.getElementById("UserInput-latSize").options.item(5).setAttribute("style", "display:initial");
        document.getElementById("UserInput-latSize").options.item(6).setAttribute("style", "display:initial");
        break;
        case 1.5:
        // document.getElementById("UserInput-latSize").selectedIndex = '3'
        document.getElementById("UserInput-latSize").options.item(3).setAttribute("style", "display:initial");
        document.getElementById("UserInput-latSize").options.item(4).setAttribute("style", "display:initial");
        document.getElementById("UserInput-latSize").options.item(5).setAttribute("style", "display:initial");
        document.getElementById("UserInput-latSize").options.item(6).setAttribute("style", "display:initial");
        break;
        case 2:
        // document.getElementById("UserInput-latSize").selectedIndex = '4'
        document.getElementById("UserInput-latSize").options.item(4).setAttribute("style", "display:initial");
        document.getElementById("UserInput-latSize").options.item(5).setAttribute("style", "display:initial");
        document.getElementById("UserInput-latSize").options.item(6).setAttribute("style", "display:initial");
        break;
        case 3:
        // document.getElementById("UserInput-soilClass").selectedIndex = ''
        document.getElementById("UserInput-latSize").options.item(5).setAttribute("style", "display:initial");
        document.getElementById("UserInput-latSize").options.item(6).setAttribute("style", "display:initial");
        break;
        case 4:
        // document.getElementById("UserInput-soilClass").selectedIndex = ''
        document.getElementById("UserInput-latSize").options.item(6).setAttribute("style", "display:initial");
        break;
}
}