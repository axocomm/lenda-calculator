'use strict';

$(document).ready(function() {
    var ex = {
        loanAmount: 100000,
        monthlyInterestRate: (0.00416667 * 12),
        newTerm: 15
    };

    console.log(calculateNewPayment(ex.loanAmount, ex.monthlyInterestRate,
                                    ex.newTerm));
});

/**
 * Calculate the new mortgage payment.
 *
 * @param {number} loanAmount the current loan amount
 * @param {number} interestRate the new annual interest rate
 * @param {number} newTerm the term of the new loan in years
 *
 * @return {number} the new monthly payment
 */
function calculateNewPayment(loanAmount, interestRate, newTerm) {
    var months = 12 * newTerm;
    var monthlyInterest = interestRate / 12;

    return loanAmount *
        (monthlyInterest * Math.pow(1 + monthlyInterest, months)) /
        (Math.pow(1 + monthlyInterest, months) - 1);
}
