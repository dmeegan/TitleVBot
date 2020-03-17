
function createManiSizeOptions() {

    const manifoldType = document.getElementById('UserInput-manifoldType').value
    const distalHead = +document.getElementById('UserInput-distalHead').value
    const sasAreaLength = +document.getElementById("UserInput-sasAreaLength").value
    const sasAreaWidth = +document.getElementById('result-minimumSASAreaWidth').value
    const latSpacing = +document.getElementById("UserInput-latSpacing").value
    const pipeMaterial = document.getElementById("UserInput-pipeMaterial").value
    const perfDia = +document.getElementById("UserInput-perfDia").value
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

    // This function calculates the lateral discharge rate (Q) using the perforation discharge rate (perfDis) and the number of total number of perforations per lateral (N) */
    const latDis = () => perfDis() * perfNum()

    // The following switch statement determines the total discharge rate per trench (maniSegDis) based on whether the manifold is location in the center ('Center') or the end ('End') of the SAS.
    switch (manifoldType) {
        case 'Center':
            maniSegDis = 2 * latDis()
            break;
        case 'End':
            maniSegDis = latDis()
            break;
    }

    const maniSegNum = () => (sasAreaWidth / latSpacing)



    let maniFlowIterator = 0
    let sumManiFrictionLoss = 0
    do {
        const maniDownStreamFlow = () => maniSegDis * (maniSegNum() - maniFlowIterator)
        const maniSegFrictionFactor = () => 0.00098 * Math.pow(maniDownStreamFlow(), 1.85)
        const maniSegFrictionLoss = () => latSpacing * maniSegFrictionFactor()
        sumManiFrictionLoss += maniSegFrictionLoss()
        maniFlowIterator++
    } while (maniFlowIterator < maniSegNum())

    const minimumManiDia = () => Math.ceil(Math.pow((sumManiFrictionLoss / (0.1 * distalHead)), 0.21))

    const maniSizes = [1, 1.25, 1.5, 2, 3, 4, 5, 6, 8, 10, 12, 14, 16, 18]

    // The following do while loop, chooses the nominal manifold size to use, based on the minimum manifold size (useManiDia) and the available nominal manifold sizes (maniSizes)
    let maniSizeDifference = 100
    let maniOptionSelector = document.getElementById("UserInput-maniSize");
    let maniSizeIterator = 13;
    while(maniSizeDifference > 1) {
        maniSizeDifference = maniSizes[maniSizeIterator] - minimumManiDia();
        useManiDia = maniSizes[maniSizeIterator];
        maniOptionSelector.options[maniSizeIterator+1].style.display = "initial";
        maniSizeIterator--;
    }   
}