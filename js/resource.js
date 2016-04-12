var buildings = [
    {name: 'Coal Mine'},
    {name: 'Compass Wood Forest'},
    {name: 'Copper Ore Mine'},
    {name: 'Fir Forest'},
    {name: 'Forge'},
    {name: 'Gold Mine'},
    {name: 'Hemp Plantation'},
    {name: 'Iron Ore Mine'},
    {name: 'Lignum Vitae Forest'},
    {name: 'Live Oak Forest'},
    {name: 'Oak Forest'},
    {name: 'Pine Forest'},
    {name: 'Red Wood Forest'},
    {name: 'Shipyard'},
    {name: 'Silver Mine'},
    {name: 'Stone Mine'},
    {name: 'Teak Forest'},
    {name: 'Workshop'}
];
var config = {
    form: {
        url: "https://docs.google.com/forms/d/1WrwwySF5lTweADvVV72fHex03Br3_sc2HIDjqLfa1nw/formResponse",
        pseudoField: "entry.673566190",
        infosField: "entry.571865672"
    }
};
var selectedBuildings = [];
function SwitchToLoadingScreen(message) {
    $("#loading-screen").removeClass("hide");
    $("#data-screen").addClass("hide");
}
function SwitchToDataScreen() {
    $("#loading-screen").addClass("hide");
    $("#data-screen").removeClass("hide");
}
function LoadSelectBuildings() {
    var selectBuildings = $("#select-buildings");
    selectBuildings.empty();
    selectBuildings.append('<option value="" disabled selected>Choisissez vos batiments</option>');
    buildings.forEach(function (building) {
        selectBuildings.append('<option value="' + building.name + '">' + building.name + "</option>");
    });
    selectBuildings.material_select();
    selectBuildings.on('change', function () {
        SelectBuildingsChange($(this).val());
    })
}
function RecoverLevel() {
    selectedBuildings.forEach(function (building, idx) {
        selectedBuildings[idx].lvl = $('#lvl-' + idx).val();
    })
}
function SendToGoogleSheet(pseudo, infos) {
    var data = {};
    data[config.form.pseudoField] = pseudo;
    var infosString = "";
    infos.forEach(function (info) {
        if (infosString == ""){
            infosString = info.name + "=" + info.lvl;
        } else {
            infosString += "," + info.name + "=" + info.lvl;
        }
    });
    data[config.form.infosField] = infosString;
    $.ajax({url:config.form.url,data: data, method:"POST"}).always(function () {
        console.log("Done");
    });
}
function SubmitForm(event) {
    event.preventDefault();
    var pseudo = $('#pseudo').val();
    RecoverLevel();
    SendToGoogleSheet(pseudo, selectedBuildings);
}
function SelectBuildingsChange(buildings) {
    var buildingsLvl = $('#buildings-lvl');
    selectedBuildings = [];
    var options = '<option value="1" selected>Level 1</option><option value="2">Level 2</option><option value="3">Level 3</option>';
    buildingsLvl.empty();
    buildings.forEach(function (building, idx) {
        selectedBuildings.push({name: building});
        buildingsLvl.append('<div class="input-field col s12"><select id="lvl-'+idx+'">'+options+'</select><label>'+building+' Level</label></div>');
    });
    $("select[id!='select-buildings']").material_select();
    if (buildingsLvl.hasClass('hide')){
        buildingsLvl.removeClass("hide");
    }
    if ($("button[type='submit']").hasClass('hide')){
        $("button[type='submit']").removeClass("hide");
    }
}
$(document).ready(function () {
    LoadSelectBuildings();
    SwitchToDataScreen();
    $('form').submit(SubmitForm);

});