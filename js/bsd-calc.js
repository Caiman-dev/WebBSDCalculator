//запуск select'ов
$(document).ready(function () {
    $('select').formSelect();
});

const senderBlock = document.getElementById("sender-block");
const recieverBlock = document.getElementById("reciever-block");
const senderCity = document.getElementById("sender-city");
const recieverCity = document.getElementById("reciever-city");
const weight = document.getElementById("weight");
const volume = document.getElementById("volume");
const resultField = document.getElementById("result-field");
const volResultField = document.getElementById("result-vol");

let senderCityValue = '', recieverCityValue = '', direction = 'RST'
let row, weightValue, volumeValue, weightResult, volumeResult, finalResult;
let isValidWeight = false, isValidVolume = false;

let tarif = [
    [600, 38, 22, 20, 19, 18, 18, 600, 9500, 5500, 5000, 4750, 4500, 4500],
    [600, 34, 20, 18, 17, 16, 16, 600, 8500, 5000, 4500, 4250, 4000, 4000],
    [600, 40, 22, 20, 19, 17, 16, 600, 10000, 5500, 5000, 4750, 4250, 4000],
    [600, 40, 22, 20, 19, 17, 16, 600, 10000, 5500, 5000, 4750, 4250, 4000],
    [600, 34, 20, 18, 17, 16, 16, 600, 8500, 5000, 4500, 4250, 4000, 4000],
    [600, 38, 22, 20, 19, 18, 18, 600, 9500, 5500, 5000, 4750, 4500, 4500],
    [600, 40, 22, 20, 19, 17, 16, 600, 10000, 5500, 5000, 4750, 4250, 4000],
    [700, 48, 28, 28, 26, 23, 22, 700, 12000, 7000, 7000, 6500, 5750, 5500],
    [600, 34, 15, 14, 13, 12, 12, 600, 8500, 3750, 3500, 3250, 3000, 3000],
    [600, 34, 15, 14, 13, 12, 12, 600, 8500, 3750, 3500, 3250, 3000, 3000],
    [600, 34, 15, 14, 13, 12, 12, 600, 8500, 3750, 3500, 3250, 3000, 3000],
    [600, 34, 15, 14, 13, 12, 12, 600, 8500, 3750, 3500, 3250, 3000, 3000],
    [600, 34, 15, 14, 13, 12, 12, 600, 8500, 3750, 3500, 3250, 3000, 3000],
    [600, 34, 15, 14, 13, 12, 12, 600, 8500, 3750, 3500, 3250, 3000, 3000],
    [600, 34, 15, 14, 13, 12, 12, 600, 8500, 3750, 3500, 3250, 3000, 3000],
    [700, 48, 28, 28, 26, 23, 22, 700, 12000, 7000, 7000, 6500, 5750, 5500]
];

let limits = [
    [0, 1650, 3800, 11000, 20000, 28500, 54000, 0, 1500, 4750, 13750, 25000, 21375, 67500],
    [0, 1450, 3400, 10000, 18000, 25500, 48000, 0, 1300, 4250, 12500, 22500, 19125, 60000],
    [0, 1700, 4000, 11000, 20000, 28500, 51000, 0, 1500, 5000, 13750, 25000, 21375, 63750],
    [0, 1700, 4000, 11000, 20000, 28500, 51000, 0, 1500, 5000, 13750, 25000, 21375, 63750],
    [0, 1450, 3400, 10000, 18000, 25500, 48000, 0, 1300, 4250, 12500, 22500, 19125, 60000],
    [0, 1650, 3800, 11000, 20000, 28500, 54000, 0, 1500, 4750, 13750, 25000, 21375, 67500],
    [0, 1850, 4000, 11000, 20000, 28500, 51000, 0, 1700, 5000, 13750, 25000, 21375, 63750],
    [0, 2150, 4800, 14000, 28000, 39000, 69000, 0, 2000, 6000, 17500, 35000, 29250, 86250],
    [0, 1050, 3400, 7500, 14000, 19500, 36000, 0, 1500, 4250, 9375, 17500, 14625, 45000],
    [0, 950, 3400, 7500, 14000, 19500, 36000, 0, 1300, 4250, 9375, 17500, 14625, 45000],
    [0, 1050, 3400, 7500, 14000, 19500, 36000, 0, 1500, 4250, 9375, 17500, 14625, 45000],
    [0, 1050, 3400, 7500, 14000, 19500, 36000, 0, 1500, 4250, 9375, 17500, 14625, 45000],
    [0, 950, 3400, 7500, 14000, 19500, 36000, 0, 1300, 4250, 9375, 17500, 14625, 45000],
    [0, 1050, 3400, 7500, 14000, 19500, 36000, 0, 1500, 4250, 9375, 17500, 14625, 45000],
    [0, 1050, 3400, 7500, 14000, 19500, 36000, 0, 1700, 4250, 9375, 17500, 14625, 45000],
    [0, 1350, 4800, 14000, 28000, 39000, 69000, 0, 2000, 6000, 17500, 35000, 29250, 86250]
];

//выбрать направление
function getDirection(radio) {
    if (radio.value === '1') {
        direction = 'RST';
        SetResultFieldToDefault();
        SetCityValuesToDefault();
        SetWeightAndVolumeToDefault();
        senderBlock.hidden = true;
        recieverBlock.hidden = false;
    }
    else if (radio.value === '2') {
        direction = 'DNR';
        SetResultFieldToDefault();
        SetCityValuesToDefault();
        SetWeightAndVolumeToDefault();
        senderBlock.hidden = false;
        recieverBlock.hidden = true;
    }
}

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

    // $('#sender-city').on('keyup', function () {
    //     if (instances[0].count === 0) {
    //         $('#sender-city').val('');
    //     }
    // })

    // $('#reciever-city').on('keyup', function () {
    //     if (instances[0].count === 0) {
    //         $('#reciever-city').val('');
    //     }
    // })
});

//обнулить результат
SetResultFieldToDefault = () => {
    resultField.innerHTML = '';
}

//
SetCityValuesToDefault = () => {
    senderCity.value = '';
    recieverCity.value = '';
    senderCityValue = '';
    recieverCityValue = '';
}

SetWeightAndVolumeToDefault = () => {
    row = '';
    weightResult = '';
    volumeResult = '';
}

//обнулить результат при изменении input'ов и записать данные в переменные
$("#sender-city").on('change', function () {
    SetResultFieldToDefault();
    senderCityValue = senderCity.value;
});

$("#reciever-city").on('change', function () {
    SetResultFieldToDefault();
    recieverCityValue = recieverCity.value;
});

$("#weight").on('change', function () {
    weightValue = Number(weight.value);
    SetResultFieldToDefault();
});

$("#volume").on('change', function () {
    volumeValue = Number(volume.value) / 250;
    console.log(volumeValue);
    SetResultFieldToDefault();
    volResultField.innerHTML = volumeValue;
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
    if (direction === 'RST') {
        if (recieverCityValue == 'Донецк') {
            row = 0;
        }
        else if (recieverCityValue == 'Макеевка') {
            row = 1;
        }
        else if (recieverCityValue == 'Горловка' || recieverCityValue == 'Енакиево') {
            row = 2;
        }
        else if (recieverCityValue == 'Шахтерск' || recieverCityValue == 'Снежное' || recieverCityValue == 'Красный Луч') {
            row = 3;
        }
        else if (recieverCityValue == 'Луганск') {
            row = 4;
        }
        else if (recieverCityValue == 'Стаханов' || recieverCityValue == 'Алчевск') {
            row = 5;
        }
        else if (recieverCityValue == 'Мариуполь') {
            row = 6;
        }
        else if (recieverCityValue == 'Бердянск' || recieverCityValue == 'Мелитополь') {
            row = 7;
        }
    }
    else if (direction === 'DNR') {
        if (senderCityValue == 'Донецк') {
            row = 8;
        }
        else if (senderCityValue == 'Макеевка') {
            row = 9;
        }
        else if (senderCityValue == 'Горловка' || senderCityValue == 'Енакиево') {
            row = 10;
        }
        else if (senderCityValue == 'Шахтерск' || senderCityValue == 'Снежное' || senderCityValue == 'Красный Луч') {
            row = 11;
        }
        else if (senderCityValue == 'Луганск') {
            row = 12;
        }
        else if (senderCityValue == 'Стаханов' || senderCityValue == 'Алчевск') {
            row = 13;
        }
        else if (senderCityValue == 'Мариуполь') {
            row = 14;
        }
        else if (senderCityValue == 'Бердянск' || senderCityValue == 'Мелитополь') {
            row = 15;
        }
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

    weightResult = weightValue * tarif[row][col] < limits[row][col] ? limits[row][col] : weightValue * tarif[row][col];
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

    volumeResult = volumeValue * tarif[row][col] < limits[row][col] ? limits[row][col] : volumeValue * tarif[row][col]
    return volumeResult;
}

function CheckFieldsIsNotEmpty() {
    if (direction === 'RST' && recieverCityValue != '' &&
        weight.value.length && weightValue != '' && weightValue != '0' &&
        volume.value.length && volumeValue != '' && volumeValue != '0') {
        return true;
    }
    else if (direction === 'DNR' && senderCityValue != '' &&
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
    if (CheckFieldsIsNotEmpty()) {
        GetWeight();
        GetVolume();

        console.log(`senderCity = ${senderCityValue}, recieverCity = ${recieverCityValue}, weightResult = ${weightResult}, volumeResult = ${volumeResult}, row = ${row}`);

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

