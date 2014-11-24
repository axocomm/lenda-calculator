'use strict';

$(document).ready(function () {
    var ex = {
        currentMonthlyPayment: 976,
        currentInterestRate: 0.04215,
        loanAmount: 273224,
        monthsRemaining: 20,
        newTerm: 15
    };

    populateExample(ex);

    $('#current-form').on('submit', function (e) {
        e.preventDefault();
        var currentDetails = getCurrentDetails($('#current-form fieldset')
                                              .serializeArray());
        updateResultForms(currentDetails);
    });
});

/**
 * Populate the current form for example data.
 *
 * @param {object} example the example data
 */
function populateExample(example) {
    var years = Math.floor(example.monthsRemaining / 12);
    var months = example.monthsRemaining % 12;

    $('#current-form #current-monthly-payment')
        .val(example.currentMonthlyPayment);
    $('#current-form #current-interest-rate')
        .val(example.currentInterestRate * 100);
    $('#current-form #remaining-balance')
        .val(example.loanAmount);
    $('#current-form #remaining-years').val(years);
    $('#current-form #remaining-months').val(months);
    $('#current-form #new-loan-terms').val(example.newTerm)
}

/**
 * Update the result forms.
 *
 * @param {object} currentDetails the current details
 */
function updateResultForms(currentDetails) {
    ;
}

/**
 * Get an object representing the current loan information.
 *
 * @param {array} inputs the form inputs
 *
 * @return {object} a current loan object
 */
function getCurrentDetails(inputs) {
    var details = {};
    inputs.forEach(function (input) {
        details[input.name] = input.value;
    });

    return {
        currentMonthlyPayment: parseFloat(details['current-monthly-payment']),
        currentInterestRate: parseFloat(details['current-interest-rate']) / 100,
        loanAmount: parseFloat(details['remaining-balance']),
        monthsRemaining: parseInt(details['remaining-months']) +
            (parseInt(details['remaining-years']) * 12),
        newTerm: parseInt(details['new-loan-terms'])
    };
}

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
