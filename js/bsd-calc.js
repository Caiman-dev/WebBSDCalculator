//запуск select'ов
$(document).ready(function () {
    $('select').formSelect();
});

const city = document.getElementById("city");
const weight = document.getElementById("weight");
const volume = document.getElementById("volume");
const resultField = document.getElementById("result-field");


let cityValue = '';
let row, weightValue, volumeValue,
    weightResult, volumeResult, finalResult;

let isValidWeight = false, isValidVolume = false;

let tarif = [
    [650, 26, 19, 18, 17, 17, 16, 650, 6500, 4750, 4500, 4250, 4250, 4000],
    [650, 26, 19, 18, 17, 17, 16, 650, 6500, 4750, 4500, 4250, 4250, 4000],
    [650, 26, 19, 18, 17, 17, 16, 650, 6500, 4750, 4500, 4250, 4250, 4000],
    [650, 26, 19, 18, 17, 17, 16, 650, 6500, 4750, 4500, 4250, 4250, 4000],
    [650, 26, 19, 18, 17, 17, 16, 650, 6500, 4750, 4500, 4250, 4250, 4000],
    [700, 32, 24, 23, 21, 21, 20, 700, 8000, 6000, 5750, 5250, 5250, 5000]
];

//заполняем города
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.autocomplete');
    var instances = M.Autocomplete.init(elems, {
        data: {
            "Донецк": null,
            "Макеевка": null,
            "Горловка": null,
            "Енакиево": null,
            "Шахтерск": null,
            "Снежное": null,
            "Красный Луч": null,
            "Алчевск": null,
            "Луганск": null,
            "Стаханов": null,
            "Мариуполь": null,
            "Бердянск": null,
            "Мелитополь": null,
        },
        minLength: 0,
    });

    $('#city').on('keyup', function () {
        if (instances[0].count === 0) {
            $('#city').val('');
        }
    })
});

//обнулить результат
SetResultFieldToDefault = () => {
    let resultField = document.getElementById("result-field");
    resultField.innerHTML = ""
}

//обнулить результат при изменении input'ов и записать данные в переменные
$("#city").on('change', function () {
    cityValue = city.value;
    SetResultFieldToDefault();
});

$("#weight").on('change', function () {
    weightValue = Number(weight.value);
    SetResultFieldToDefault();
});

$("#volume").on('change', function () {
    volumeValue = Number(volume.value);
    SetResultFieldToDefault();
});

//валидация weight
document.getElementById("weight").addEventListener("keyup", CheckWeight);
document.getElementById("weight").addEventListener("keyup", CheckInputs);
function CheckWeight() {
    if (!weight.value || !weight.value.length) {
        return;
    }
    var regex = /^\d+(\.\d{1,4})?$/;
    if (!regex.test(weight.value)) {
        weight.classList.remove("valid");
        weight.classList.add("invalid");
        $('#result-btn').removeClass("waves-effect waves-light submit").addClass('disabled');
        isValidWeight = false;
    } else {
        weight.classList.remove("invalid");
        weight.classList.add("valid");
        isValidWeight = true;
    }
}

//валидация volume
document.getElementById("volume").addEventListener("keyup", CheckVolume);
document.getElementById("volume").addEventListener("keyup", CheckInputs);
function CheckVolume() {
    if (!volume.value || !volume.value.length) {
        return;
    }
    var regex = /^\d+(\.\d{1,4})?$/;
    if (!regex.test(volume.value)) {
        volume.classList.remove("valid");
        volume.classList.add("invalid");
        $('#result-btn').removeClass("waves-effect waves-light submit").addClass('disabled');
        isValidVolume = false;
    } else {
        volume.classList.remove("invalid");
        volume.classList.add("valid");
        isValidVolume = true;
    }
}

//общая валидация
function CheckInputs() {
    if (!isValidWeight || !isValidVolume) {
        $('#result-btn').removeClass("waves-effect waves-light submit").addClass('disabled');
    }
    else {
        $('#result-btn').addClass("waves-effect waves-light submit").removeClass('disabled');
    }
}

function GetRow() {
    if (cityValue == 'Макеевка' || cityValue == 'Донецк') {
        row = 0;
    }
    else if (cityValue == 'Горловка' || cityValue == 'Енакиево' || cityValue == 'Шахтерск') {
        row = 1;
    }
    else if (cityValue == 'Снежное' || cityValue == 'Красный Луч') {
        row = 2;
    }
    else if (cityValue == 'Луганск' || cityValue == 'Стаханов' || cityValue == 'Алчевск') {
        row = 3;
    }
    else if (cityValue == 'Мариуполь') {
        row = 4;
    }
    else if (cityValue == 'Бердянск' || cityValue == 'Мелитополь') {
        row = 5;
    }
}

//раcчет weight
function GetWeight() {
    GetRow();
    let col;
    if (weightValue > 0 && weightValue <= 2) {
        col = 0;
        weightResult = tarif[row][col];
        return weightResult;
    }
    else if (weightValue > 2 && weightValue <= 100) {
        col = 1;
    }
    else if (weightValue > 100 && weightValue <= 500) {
        col = 2;
    }
    else if (weightValue > 500 && weightValue <= 1000) {
        col = 3;
    }
    else if (weightValue > 1000 && weightValue <= 1500) {
        col = 4;
    }
    else if (weightValue > 1500 && weightValue <= 3000) {
        col = 5;
    }
    else if (weightValue > 3000 && weightValue <= 10000) {
        col = 6;
    }

    weightResult = weightValue * tarif[row][col];
    return weightResult;
}

//раcчет м3
function GetVolume() {
    GetRow();
    let col;
    if (volumeValue > 0 && volumeValue <= 0.01) {
        col = 7;
        volumeResult = tarif[row][col];
        return volumeResult;
    }
    else if (volumeValue > 0.01 && volumeValue <= 0.5) {
        col = 8;
    }
    else if (volumeValue > 0.5 && volumeValue <= 2.5) {
        col = 9;
    }
    else if (volumeValue > 2.5 && volumeValue <= 5) {
        col = 10;
    }
    else if (volumeValue > 5 && volumeValue <= 7.5) {
        col = 11;
    }
    else if (volumeValue > 7.5 && volumeValue <= 15) {
        col = 12;
    }
    else if (volumeValue > 15 && volumeValue <= 25) {
        col = 13;
    }

    volumeResult = volumeValue * tarif[row][col];
    return volumeResult;
}

function CheckFieldsIsNotEmpty() {
    if (cityValue != '' &&
        weight.value.length && weightValue != '' && weightValue != '0' &&
        volume.value.length && volumeValue != '' && volumeValue != '0') {
        return true;
    }
    else {
        return false;
    }
}
//общий рачет
function GetResult() {
    GetWeight();
    GetVolume();
    console.log(`сity = ${cityValue}, weightResult = ${weightResult}, volumeResult = ${volumeResult}, row = ${row}`);
    if (CheckFieldsIsNotEmpty()) {
        if (!isNaN(parseInt(weightResult)) && !isNaN(parseInt(volumeResult))) {
            finalResult = weightResult > volumeResult ? weightResult : volumeResult;
            resultField.innerHTML = Math.round(finalResult / 50) * 50 + " р.";
        }
        else {
            alert("Расчет производится только до 10000 кг и до 25 м3");
        }
    }
    else {
        alert("Все поля должны быть заполнены!");
    }
}