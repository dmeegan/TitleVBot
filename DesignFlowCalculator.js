
function createUseTypeOptions() {

    document.getElementById('resUseTypeDiv').style.display = 'none';
    document.getElementById('comUseTypeDiv').style.display = 'none';
    document.getElementById('instUseTypeDiv').style.display = 'none';
    document.getElementById('schoolUseTypeDiv').style.display = 'none';
    document.getElementById("flowUnitDiv").style.display = 'none';
    document.getElementById("flowUnitAddDiv").style.display = 'none';

    var establishmentType = document.getElementById('UserInput-establishmentType').value;
    switch (establishmentType) {
        case 'Residential':
            document.getElementById('resUseTypeDiv').style.display = 'block';
            break;
        case 'Commercial':
            document.getElementById('comUseTypeDiv').style.display = 'block';
            break;
        case 'Institutional':
            document.getElementById('instUseTypeDiv').style.display = 'block';
            break;
        case 'School':
            document.getElementById('schoolUseTypeDiv').style.display = 'block';
            break;

    }
    document.getElementById("UserInput-resUseType").value = '';
    document.getElementById("UserInput-comUseType").value = '';
    document.getElementById("UserInput-instUseType").value = '';
    document.getElementById("UserInput-schoolUseType").value = '';
}



function createUnitFlowOptions() {
    document.getElementById("flowUnitDiv").style.display = 'none';
    document.getElementById("flowUnitAddDiv").style.display = 'none';
    document.getElementById("flowUnitLabelSpan").innerHTML = '';
    document.getElementById("result-flowUnitLabelSpan").innerHTML = '';
    document.getElementById("flowUnitAddLabelSpan").innerHTML = '';
    document.getElementById("result-flowUnitAddLabelSpan").innerHTML = '';



    const establishmentType = document.getElementById('UserInput-establishmentType').value;
    const resUseTypeIndex = +document.getElementById("UserInput-resUseType").value;
    const comUseTypeIndex = +document.getElementById("UserInput-comUseType").value;
    const insUseTypeIndex = +document.getElementById("UserInput-instUseType").value;
    const schoolUseTypeIndex = +document.getElementById("UserInput-schoolUseType").value;

    const residentialUnit = ['', 'bedrooms', 'bedrooms', 'persons', 'persons', 'persons', 'sites', 'bedrooms', 'bedrooms', 'mobile homes', 'bedrooms', 'sites', 'two bedroom units', 'persons']
    const commercialUnit = ['', 'passengers', 'chairs', 'alleys', 'seats', 'seats', 'lockers', 'doctors', 'dentists', 'persons', 'persons', 'islands', 'kennels', 'seats', 'slips', 'seats', 'washing machines', '1000 sq.ft.', '1000 sq.ft.', 'seats', 'seats', 'seats', 'seats', 'bays', 'seats', '1000 sq.ft.', 'persons', 'courts', 'seats', 'trailers']
    const institutionalUnit = ['', 'seats', 'seats', 'beds', 'seats', 'participants', 'spectator', 'beds', 'beds', 'beds', 'persons', 'persons', 'persons']
    const schoolUnit = ['', 'persons', 'persons', 'persons', 'persons', 'persons', 'persons', 'persons']

    const residentialUseFlow = ['', 110, 110, 35, 10, 13, 90, 110, 110, 300, 110, 150, 150, 50]
    const commercialUseFlow = ['', 5, 100, 100, 10, 10, 20, 250, 200, 15, 20, 75, 50, 20, 10, 5, 400, 75, 50, 35, 150, 20, 15, 150, 5, 97, 10, 250, 3, 75]
    const institutionalUseFlow = ['', 3, 6, 200, 15, 25, 3, 200, 150, 150, 5, 10, 10]
    const schoolUseFlow = ['', 5, 8, 10, 10, 15, 20, 65]

    if (resUseTypeIndex != '' || comUseTypeIndex != '' || insUseTypeIndex != '' || schoolUseTypeIndex != '') {
        document.getElementById("flowUnitDiv").style.display = 'block';
    }

    switch (establishmentType) {
        case 'Residential':
            unitType = residentialUnit[resUseTypeIndex];
            unitFlow = residentialUseFlow[resUseTypeIndex];
            document.getElementById("flowUnitLabelSpan").innerHTML = unitType;
            document.getElementById("result-flowUnitLabelSpan").innerHTML = unitType;
            break;
        case 'Commercial':
            unitType = commercialUnit[comUseTypeIndex];
            unitFlow = commercialUseFlow[comUseTypeIndex];
            document.getElementById("flowUnitLabelSpan").innerHTML = unitType;
            document.getElementById("result-flowUnitLabelSpan").innerHTML = unitType;
            break;
        case 'Institutional':
            unitType = institutionalUnit[insUseTypeIndex];
            unitFlow = institutionalUseFlow[insUseTypeIndex];
            document.getElementById("flowUnitLabelSpan").innerHTML = unitType;
            document.getElementById("result-flowUnitLabelSpan").innerHTML = unitType;
            break;
        case 'School':
            unitType = schoolUnit[schoolUseTypeIndex];
            unitFlow = schoolUseFlow[schoolUseTypeIndex];
            document.getElementById("flowUnitLabelSpan").innerHTML = unitType;
            document.getElementById("result-flowUnitLabelSpan").innerHTML = unitType;
            break;
    }


    document.getElementById("result-flowUnit").value = unitFlow;


    if (resUseTypeIndex == '2') {
        document.getElementById("flowUnitAddDiv").style.display = 'block';
        document.getElementById("result-flowUnitAddDiv").style.display = 'block';
        document.getElementById("flowUnitAddLabelSpan").innerHTML = 'seats';
        document.getElementById("result-flowUnitAddLabelSpan").innerHTML = 'seats';
        unitAddFlow = 35;
    } else if (comUseTypeIndex == '11') {
        document.getElementById("flowUnitAddDiv").style.display = 'block';
        document.getElementById("result-flowUnitAddDiv").style.display = 'block';
        document.getElementById("flowUnitAddLabelSpan").innerHTML = 'bays';
        document.getElementById("result-flowUnitAddLabelSpan").innerHTML = 'bays';
        unitAddFlow = 125;
    } else {
        document.getElementById("flowUnitAddDiv").style.display = 'none';
        document.getElementById("result-flowUnitAddDiv").style.display = 'none';
        document.getElementById("flowUnitAddLabelSpan").innerHTML = '';
        document.getElementById("result-flowUnitAddLabelSpan").innerHTML = '';
        unitAddFlow = '';
    }
    document.getElementById("result-flowUnitAdd").value = unitAddFlow;
}



function calcDesignFlow() {
    const resUseTypeIndex = +document.getElementById("UserInput-resUseType").value;
    const comUseTypeIndex = +document.getElementById("UserInput-comUseType").value;
    const flowUnitNumber = +document.getElementById("UserInput-flowUnitNumber").value;
    const flowUnitAddNumber = +document.getElementById("UserInput-flowUnitAddNumber").value;
    const unitFlow = +document.getElementById("result-flowUnit").value;
    const unitAddFlow = +document.getElementById("result-flowUnitAdd").value;

    const baseFlow = () => flowUnitNumber * unitFlow;

    const addFlow = () => flowUnitAddNumber * unitAddFlow;

    if (resUseTypeIndex == '1' && baseFlow() < 440) {
        baseFlowAdjustment = 440 - baseFlow();
        addFlowAdjustment = 0;
        alert("Per Title V section 15.203, the minimum design flow for bed & breakfast is 440 gallons per day. I have adjusted your total design flow accordingly");
    } else if (resUseTypeIndex == '2' && addFlow() < 1000) {
        baseFlowAdjustment = 0;
        addFlowAdjustment = 1000 - addFlow();
        alert("Per Title V section 15.203, the minimum design flow for bed & breakfast restaurant that is open to the public is 1000 gallons per day. I have adjusted your total design flow accordingly");
    } else if (resUseTypeIndex == '7' && baseFlow() < 330) {
        baseFlowAdjustment = 330 - baseFlow();
        addFlowAdjustment = 0;
        alert("Per Title V section 15.203, the minimum design flow for single family dwelling is 330 gallons per day. I have adjusted your total design flow accordingly");
    } else if (comUseTypeIndex == '1' && baseFlow() < 150) {
        baseFlowAdjustment = 150 - baseFlow();
        addFlowAdjustment = 0;
        alert("Per Title V section 15.203, the minimum design flow for an airport is 150 gallons per day. I have adjusted your total design flow accordingly");
    } else if (comUseTypeIndex == '11' && baseFlow() < 300) {
        baseFlowAdjustment = 300 - baseFlow();
        addFlowAdjustment = 0;
        alert("Per Title V section 15.203, the minimum design flow for a gasoline station, not including service bays, is 300 gallons per day. I have adjusted your total design flow accordingly");
    } else if (comUseTypeIndex == '14' && baseFlow() < 500) {
        baseFlowAdjustment = 500 - baseFlow();
        addFlowAdjustment = 0;
        alert("Per Title V section 15.203, the minimum design flow for a marina is 500 gallons per day. I have adjusted your total design flow accordingly");
    } else if (comUseTypeIndex == '17' && baseFlow() < 200) {
        baseFlowAdjustment = 200 - baseFlow();
        addFlowAdjustment = 0;
        alert("Per Title V section 15.203, the minimum design flow for an office building is 200 gallons per day. I have adjusted your total design flow accordingly");
    } else if (comUseTypeIndex == '18' && baseFlow() < 200) {
        baseFlowAdjustment = 200 - baseFlow();
        addFlowAdjustment = 0;
        alert("Per Title V section 15.203, the minimum design flow for a retail store is 200 gallons per day. I have adjusted your total design flow accordingly");
    } else if (comUseTypeIndex == '19' && baseFlow() < 200) {
        baseFlowAdjustment = 200 - baseFlow();
        addFlowAdjustment = 0;
        alert("Per Title V section 15.203, the minimum design flow for a retail store is 200 gallons per day. I have adjusted your total design flow accordingly");
    } else if (comUseTypeIndex == '19' && baseFlow() < 1000) {
        baseFlowAdjustment = 1000 - baseFlow();
        addFlowAdjustment = 0;
        alert("Per Title V section 15.203, the minimum design flow for a restaurant is 1000 gallons per day. I have adjusted your total design flow accordingly");
    } else if (comUseTypeIndex == '20' && baseFlow() < 1000) {
        baseFlowAdjustment = 1000 - baseFlow();
        addFlowAdjustment = 0;
        alert("Per Title V section 15.203, the minimum design flow for a thruway service area restaurant is 1000 gallons per day. I have adjusted your total design flow accordingly");
    } else if (comUseTypeIndex == '21' && baseFlow() < 1000) {
        baseFlowAdjustment = 1000 - baseFlow();
        addFlowAdjustment = 0;
        alert("Per Title V section 15.203, the minimum design flow for a fast food restaurant is 1000 gallons per day. I have adjusted your total design flow accordingly");
    } else if (comUseTypeIndex == '24' && baseFlow() < 450) {
        baseFlowAdjustment = 450 - baseFlow();
        addFlowAdjustment = 0;
        alert("Per Title V section 15.203, the minimum design flow for a service station[no gas] is 450 gallons per day. I have adjusted your total design flow accordingly");
    } else if (comUseTypeIndex == '25' && baseFlow() < 3000) {
        baseFlowAdjustment = 3000 - baseFlow();
        addFlowAdjustment = 0;
        alert("Per Title V section 15.203, the minimum design flow for a skating rink is 3000 gallons per day. I have adjusted your total design flow accordingly");
    } else {
        baseFlowAdjustment = 0;
        addFlowAdjustment = 0;
    }

    designFlow = (baseFlowAdjustment + baseFlow()) + (addFlowAdjustment + addFlow())

    document.getElementById("result-designFlow").value = designFlow;
    document.getElementById("UserInput-designFlow").value = designFlow;
}

function clearCalcDesignForm() {
    document.getElementById("UserInput-designFlow").value = '';
    document.getElementById("UserInput-resUseType").value = '';
    document.getElementById("UserInput-comUseType").value = '';
    document.getElementById("UserInput-flowUnitNumber").value = '';
    document.getElementById("UserInput-flowUnitAddNumber").value = '';
    document.getElementById("result-flowUnit").value = '';
    document.getElementById("result-flowUnitAdd").value = '';
    document.getElementById("result-designFlow").value = '';

    document.getElementById('resUseTypeDiv').style.display = 'none';
    document.getElementById('comUseTypeDiv').style.display = 'none';
    document.getElementById('instUseTypeDiv').style.display = 'none';
    document.getElementById('schoolUseTypeDiv').style.display = 'none';
    document.getElementById("flowUnitAddDiv").style.display = 'none';
    document.getElementById("result-flowUnitAddDiv").style.display = 'none';
    document.getElementById("flowUnitDiv").style.display = 'none';
}