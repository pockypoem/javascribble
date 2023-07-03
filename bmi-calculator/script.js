const dialogButton = document.getElementsByClassName("dialog-btn")[0];
const calculateButton = document.getElementsByClassName("calculate")[0];
const dialog = document.getElementsByClassName("dialog")[0];

let isOpened = false;
const toogleDialog = () => {
    if(isOpened) {
        dialog.classList.remove("display");
        isOpened = false;
    } else {
        dialog.classList.add("display");
        isOpened = true;
    }
}

const calculateBMI = () => {
    const height = Number(document.getElementsByClassName("height")[0].value)/100;
    const weight = Number(document.getElementsByClassName("weight")[0].value);
    const dialogTitle = document.getElementsByClassName("dialog-title")[0];
    const dialogResult = document.getElementsByClassName("res")[0];
    const dialogResultIcon = document.getElementsByClassName("result-icon-wrap")[0];
    
    const result = weight / (height * height);
    if(isNaN(height) || isNaN(weight)) {
        dialogTitle.innerHTML = 'Invalid values entered';
        dialogResult.innerHTML = '';
        dialogResultIcon.innerHTML = '<i class="fa fa-times-circle danger"></i>';
    } else {
        if(result < 18.5) {
            dialogResult.innerHTML = 'Result: Under Weight';
            dialogResultIcon.innerHTML = '<i class="fa fa-exclamation-circle danger"></i>';
        } else if (result >= 18.5 && result <= 24.9) {
            dialogResult.innerHTML = 'Result: Normal';
            dialogResultIcon.innerHTML = '<i class="fa fa-check-circle normal"></i>';
        } else if (result >= 25 && result <= 29.9) {
            dialogResult.innerHTML = 'Result: Over Weight';
            dialogResultIcon.innerHTML = '<i class="fa fa-exclamation-circle warn"></i>';
        } else if (result >= 30) {
            dialogResult.innerHTML = 'Result: Obesed';
            dialogResultIcon.innerHTML = '<i class="fa fa-exclamation-circle danger"></i>';
        }
        
        dialogTitle.innerHTML = `BMI Index: ${Math.round(result)}`;
    }

    toogleDialog();
}


dialogButton.addEventListener("click", toogleDialog);
calculateButton.addEventListener("click", calculateBMI);