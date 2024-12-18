// FUNCTION DECLARATION
function countDown(n) {
    if(n<=0) {
        console.log("Countdown finished!");
        return;
    }
    console.log(n);
    countDown(n - 1); // recursively calling the function declaration (this is possible due to "hoisting")
}

// call our function
countDown(3);

// ALTERNATIVE METHOD: FUNCTION EXPRESSION WITH ARROW SYNTAX

const countDown = (n) => {
    if(n<=0) {
        console.log("Countdown finished!");
        return;
    }
    console.log(n);
    countDown(n - 1); // recursively calling the function expression (this is possible due to "hoisting")
}

// call our function
countDown(3);






