
function pressureNetworkSizing() {

    const latDis = +document.getElementById('result-latDis').value
    const latNum = +document.getElementById('result-latNum').value
    const latDia = +document.getElementById('UserInput-latSize').value
    const latLength = +document.getElementById('result-latLength').value
   

    // The following function calculates the total piping volume of that laterals (latPipingVolume) in gallons, based on the number of laterals, and the length of laterals.
    const latPipingVolume = () => Math.ceil(7.48 * (Math.PI * Math.pow((latDia / 24), 2) * latNum * latLength));

    // The following function calculates the minimum dosing volume (minDoseVol) in gallons, which is 5 times the lateral piping volume.
    const minDoseVol = () => 5 * latPipingVolume();

    // The following function calculates the maximum dosing volume (maxDoseVol) in gallons, which is 10 times the lateral piping volume.
    const maxDoseVol = () => 10 * latPipingVolume();

    // The following function calculates the minimum pump discharge rate (minPumpDisRate) in gallons per minute, based on the lateral discharge rate (latDis) and the number of laterals (latNum).
    const minPumpDisRate = () => latDis * latNum;

    document.getElementById('result-latPipingVol').value = latPipingVolume();
    document.getElementById('result-minDoseVol').value = minDoseVol();
    document.getElementById('result-maxDoseVol').value = maxDoseVol();
    document.getElementById('result-minPumpDisRate').value = minPumpDisRate();
}

function clearPressureNetworkForm() {
    document.getElementById('UserInput-latSpacing').value = '';
    document.getElementById('UserInput-perfSpacing').value = '';
    document.getElementById('UserInput-perfDia').value = '';
    document.getElementById("UserInput-manifoldType").selectedIndex = '0';
    document.getElementById("UserInput-pipeMaterial").selectedIndex = '0';
    document.getElementById("UserInput-latSize").selectedIndex = '0';
    document.getElementById("UserInput-maniSize").selectedIndex = '0';
  }