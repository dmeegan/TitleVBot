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
            latNum = 2 * Math.ceil((sasAreaWidth / latSpacing))
            break;
        case 'End':
            latNum = Math.ceil((sasAreaWidth / latSpacing))
            break;
    }

    document.getElementById('result-latNum').value = latNum;

    // This function calculates the perforation discharge rate (perfDis) using the perforation diameter (perfDia) and in-line distal head (distalHead)
    const perfDis = () => 11.79 * (Math.pow(perfDia, 2)) * (Math.sqrt(distalHead))
    document.getElementById('result-perfDis').value = perfDis();

    // This function calucates the total number of perforations per lateral (perfNum) using the lateral length (latLength) and perforation spacing (perfSpacing)
    const perfNum = () => Math.floor((latLength / perfSpacing))
    document.getElementById('result-perfNum').value = perfNum();

    // This function calculates the target headloss across the laterals, using the desired distal head
    const latTargetHeadloss = () => 0.21 * distalHead

    let latSizes = [1, 1.25, 1.5, 2, 3, 4]

    let latDiaIterator = 0
    let latDeltaHead = 0
    let latOptionSelector = document.getElementById("UserInput-latSize");

    do {
        let perfFlowIterator = 0
        let latSumHeadLoss = 0
        do {
            const latDownStreamFlow = () => perfDis() * (perfNum() - perfFlowIterator)
            const latHeadLoss = () => perfSpacing * Math.pow((3.55 * latDownStreamFlow()) / (roughCoeff * (Math.pow((latSizes[latDiaIterator]), 2.63))), 1.85)
            latSumHeadLoss += latHeadLoss()
            perfFlowIterator++
        } while (perfFlowIterator < (perfNum() + 1))
        const latPressureEndHeadLoss = () => perfSpacing * Math.pow((3.55 * perfDis() * perfNum()) / (roughCoeff * (Math.pow((latSizes[latDiaIterator]), 2.63))), 1.85);
        latDeltaHead = latSumHeadLoss - latPressureEndHeadLoss();
        minimumLatDia = latSizes[latDiaIterator];
        latOptionSelector.options[latDiaIterator].style.display = "none";
        latDiaIterator++;
    } while (latDeltaHead > latTargetHeadloss())
}