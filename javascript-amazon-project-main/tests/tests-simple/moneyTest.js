import formatCurrency from "../../scripts/utils/money.js";

console.log("test suite: formatCurrency");

console.log("converts cents into dollars");
// test cases
if (formatCurrency(2095) === "20.95") {
    console.log("passed");
} else {
    console.log("failed")
};

console.log("works with 0");
// edge cases
if (formatCurrency(0) === "0.00") {
    console.log("passed");
} else {
    console.log("failed")
};

console.log("rounds up to the nearest cent");
// edge cases
if (formatCurrency(2000.5) === "20.01") {
    console.log("passed");
} else {
    console.log("failed")
};

console.log("rounds down to the nearest cent");
// edge cases
if (formatCurrency(2000.4) === "20.00") {
    console.log("passed");
} else {
    console.log("failed")
};

/*
2 Types of Test Cases:

1. Basic test cases = test if the code is working
2. Edge cases = test with values that are tricky
*/