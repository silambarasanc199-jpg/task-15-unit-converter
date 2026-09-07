/* ==========================================
   VEDA TECHNOLOGY
   TASK 15 - UNIT CONVERTER
   ========================================== */


/* ------------------------------------------
   ELEMENTS
------------------------------------------ */

const inputValue =
    document.getElementById("inputValue");

const resultValue =
    document.getElementById("resultValue");

const fromUnit =
    document.getElementById("fromUnit");

const toUnit =
    document.getElementById("toUnit");

const swapBtn =
    document.getElementById("swapBtn");

const factorText =
    document.getElementById("factorText");

const resultMessage =
    document.getElementById("resultMessage");

const categoryTabs =
    document.querySelectorAll(".category-tab");


/* ------------------------------------------
   UNIT DATABASE
------------------------------------------ */

const unitData = {

    length: {

        meter: {
            name: "Meters",
            short: "m",
            factor: 1
        },

        kilometer: {
            name: "Kilometers",
            short: "km",
            factor: 1000
        },

        centimeter: {
            name: "Centimeters",
            short: "cm",
            factor: 0.01
        },

        millimeter: {
            name: "Millimeters",
            short: "mm",
            factor: 0.001
        },

        mile: {
            name: "Miles",
            short: "mi",
            factor: 1609.344
        },

        yard: {
            name: "Yards",
            short: "yd",
            factor: 0.9144
        },

        foot: {
            name: "Feet",
            short: "ft",
            factor: 0.3048
        },

        inch: {
            name: "Inches",
            short: "in",
            factor: 0.0254
        }

    },


    weight: {

        kilogram: {
            name: "Kilograms",
            short: "kg",
            factor: 1
        },

        gram: {
            name: "Grams",
            short: "g",
            factor: 0.001
        },

        milligram: {
            name: "Milligrams",
            short: "mg",
            factor: 0.000001
        },

        pound: {
            name: "Pounds",
            short: "lb",
            factor: 0.45359237
        },

        ounce: {
            name: "Ounces",
            short: "oz",
            factor: 0.028349523125
        },

        stone: {
            name: "Stones",
            short: "st",
            factor: 6.35029318
        }

    }

};


/* ------------------------------------------
   CURRENT CATEGORY
------------------------------------------ */

let currentCategory = "length";


/* ------------------------------------------
   POPULATE UNITS
------------------------------------------ */

function populateUnits() {

    const data =
        unitData[currentCategory];

    fromUnit.innerHTML = "";
    toUnit.innerHTML = "";


    Object.entries(data).forEach(
        ([key, unit]) => {

            const fromOption =
                document.createElement("option");

            fromOption.value = key;

            fromOption.textContent =
                `${unit.name} (${unit.short})`;

            fromUnit.appendChild(
                fromOption
            );


            const toOption =
                document.createElement("option");

            toOption.value = key;

            toOption.textContent =
                `${unit.name} (${unit.short})`;

            toUnit.appendChild(
                toOption
            );

        }
    );


    if (currentCategory === "length") {

        fromUnit.value =
            "kilometer";

        toUnit.value =
            "meter";

    } else {

        fromUnit.value =
            "kilogram";

        toUnit.value =
            "pound";

    }


    convert();

}


/* ------------------------------------------
   FORMAT NUMBER
------------------------------------------ */

function formatNumber(value) {

    if (!Number.isFinite(value)) {

        return "0";

    }


    return Number(
        value.toFixed(4)
    ).toString();

}


/* ------------------------------------------
   CONVERT
------------------------------------------ */

function convert() {

    const value =
        parseFloat(inputValue.value);


    if (
        inputValue.value === "" ||
        Number.isNaN(value)
    ) {

        resultValue.value = "";

        factorText.textContent =
            "Enter a valid value";

        resultMessage.textContent =
            "Waiting for a valid value...";

        return;

    }


    const data =
        unitData[currentCategory];


    const from =
        data[fromUnit.value];

    const to =
        data[toUnit.value];


    /* Convert input to base unit */

    const baseValue =
        value * from.factor;


    /* Convert base unit to target */

    const converted =
        baseValue / to.factor;


    const formatted =
        formatNumber(converted);


    resultValue.value =
        formatted;


    /* Conversion factor */

    const factor =
        from.factor / to.factor;


    factorText.textContent =
        `1 ${from.name.toLowerCase()} = ${formatNumber(factor)} ${to.name.toLowerCase()}`;


    resultMessage.textContent =
        `${formatNumber(value)} ${from.short} = ${formatted} ${to.short}`;

}


/* ------------------------------------------
   CATEGORY TABS
------------------------------------------ */

categoryTabs.forEach(
    tab => {

        tab.addEventListener(
            "click",
            () => {

                categoryTabs.forEach(
                    item => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                tab.classList.add(
                    "active"
                );


                currentCategory =
                    tab.dataset.category;


                inputValue.value = 1;


                populateUnits();

            }
        );

    }
);


/* ------------------------------------------
   INPUT
------------------------------------------ */

inputValue.addEventListener(
    "input",
    convert
);


/* ------------------------------------------
   FROM UNIT
------------------------------------------ */

fromUnit.addEventListener(
    "change",
    convert
);


/* ------------------------------------------
   TO UNIT
------------------------------------------ */

toUnit.addEventListener(
    "change",
    convert
);


/* ------------------------------------------
   SWAP
------------------------------------------ */

swapBtn.addEventListener(
    "click",
    () => {

        const oldFrom =
            fromUnit.value;

        fromUnit.value =
            toUnit.value;

        toUnit.value =
            oldFrom;

        convert();

    }
);


/* ------------------------------------------
   INITIALIZE
------------------------------------------ */

populateUnits();
