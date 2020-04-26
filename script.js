const functions = {

    "+": function (a, b) {
        return a + b;
    },
    "-": function (a, b) {
        return a - b;
    },
    "*": function (a, b) {
        return a * b;
    },
    "/": function (a, b) {
        return a / b;
    },

};

let global = [];



let backspaceClick = function () {
    if (firstDisplay.textContent.indexOf("=") != -1) {
        secondDisplay.textContent = secondDisplay.textContent.slice(0, secondDisplay.textContent.length - 1);
    } else {
        if (secondDisplay.textContent != "") {
            secondDisplay.textContent = secondDisplay.textContent.slice(0, secondDisplay.textContent.length - 1);
        } else {
            firstDisplay.textContent = undefined;
            secondDisplay.textContent = global[global.length - 2];
            global.splice(global.length - 2, 2);
            for (var i = 0; i < global.length; i++) {
                firstDisplay.textContent = firstDisplay.textContent + global[i];
            }


        }
    }
}

let clearClick = function () {
    global = [];
    secondDisplay.textContent = undefined;
    firstDisplay.textContent = undefined;

}

let equalClick = function (object) {
    if (global[global.length - 1] == "/" && secondDisplay.textContent == "0") {
        alert("Division by zero!");
    } else {
        if (secondDisplay.textContent != "" && typeof (global[global.length - 1]) == "string") {
            firstDisplay.textContent += secondDisplay.textContent + object.target.textContent;
            global.push(parseFloat(secondDisplay.textContent));
            console.log(global);
            let result;

            for (var i = 0; i < global.length; i++) {
                if (global[i] == "/" || global[i] == "*") {
                    result = operate(functions[global[i]], global[i - 1], global[i + 1]);
                    global.splice(i - 1, 3, result);
                    i = i - 1;
                }
            }

            for (var j = 0; j < global.length; j++) {
                if (global[j] == "+" || global[j] == "-") {
                    result = operate(functions[global[j]], global[j - 1], global[j + 1]);
                    global.splice(j - 1, 3, result);
                    j = j - 1;
                }
            }


            console.log(global);
            secondDisplay.textContent = global[0];
            global = [];

        }
    }
}
let numberClick = function (object) {


    if (secondDisplay.textContent.indexOf(".") != -1 && object.target.textContent == ".") {

    } else {
        secondDisplay.textContent += object.target.textContent;
    }
};

let operatorClick = function (object) {
    if (global[global.length - 1] == "/" && secondDisplay.textContent == "0") {
        alert("Division by zero!");
    } else {

        if (firstDisplay.textContent.indexOf("=") != -1) {
            firstDisplay.textContent = undefined;
        }
        if (secondDisplay.textContent != "") {

            global.push(parseFloat(secondDisplay.textContent));
            secondDisplay.textContent = undefined;
            global.push(object.target.textContent);
            firstDisplay.textContent += global[global.length - 2] + global[global.length - 1];
        }

    }
}

let operate = function (operator, number1, number2) {
    return operator(number1, number2);
}

const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll('.operators');
const firstDisplay = document.querySelector('#first-display');
const secondDisplay = document.querySelector('#second-display');
const equal = document.querySelector('#Enter');
const clear = document.querySelector('#clear')
const backspace = document.querySelector('#Backspace');

backspace.addEventListener('click', backspaceClick)
clear.addEventListener('click', clearClick);
equal.addEventListener('click', equalClick)
numbers.forEach(function (number) {
    number.addEventListener('click', numberClick)

})

operators.forEach(function (operator) {
    operator.addEventListener('click', operatorClick)

})

let objects = [numbers, operators, equal, backspace]

window.addEventListener("keydown", function (e) {


    for (var i = 0; i < objects.length; i++) {
        if (objects[i].length != undefined) {
            for (var j = 0; j < objects[i].length; j++) {

                if (e.key == objects[i][j].textContent) {
                    objects[i][j].click();

                }
            }
        }
       else {
           if (e.key == "=" && objects[2]) {
            objects[2].click();
           }
           
           else if (objects[i]['id'] == e.key) {
            objects[i].click();
           }
       }
    }

})


