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
 * Get the results from the APIs.
 *
 * @param {number} term the new term
 *
 * @return {object} the results for each API
 */
function getResults(currentDetails) {
    var term = currentDetails.newTerm;
    var loanAmount = currentDetails.loanAmount;
    var monthsRemaining = currentDetails.monthsRemaining;
    var currentPayment = currentDetails.currentMonthlyPayment;

    var interestRate, newPayment, totalSavings, closingCosts;

    var results = {
        'lenda': getLendaResult(term),
        'quicken': getQuickenResult(term),
        'wells-fargo': getWellsFargoResult(term)
    };

    for (var c in results) {
        interestRate = results[c].rate / 100;
        closingCosts = results[c].cost;

        newPayment = calculateNewPayment(loanAmount, interestRate, term);
        totalSavings = calculateTotalSavings(currentPayment, newPayment,
                                             monthsRemaining, closingCosts);

        results[c].newPayment = newPayment;
        results[c].totalSavings = totalSavings;
    }

    return results;
}

/**
 * Update the result forms.
 *
 * @param {object} currentDetails the current details
 */
function updateResultForms(currentDetails) {
    var results = getResults(currentDetails);

    var selector;
    for (var c in results) {
        selector = '#compare-' + c + '-form';
        updateResultForm(selector, results[c]);
    }
}

/**
 * Update the result form.
 *
 * @param {string} selector the form selector
 * @param {object} result the result
 */
function updateResultForm(selector, result) {
    var inputs = {
        'new-interest-rate': {
            value: result.rate,
            type: 'percentage'
        },
        'closing-costs': {
            value: result.cost,
            type: 'money'
        },
        'new-monthly-payment': {
            value: result.newPayment,
            type: 'money'
        },
        'total-savings': {
            value:  result.totalSavings,
            type: 'money'
        }
    };

    var value, type;
    for (var id in inputs) {
        value = inputs[id].value;
        type = inputs[id].type;
        $(selector + ' #' + id).val(formatDisplayValue(value, type));
    }
}

/**
 * Format the value for display.
 *
 * @param {number} value the value
 * @param {string} type the value type
 *
 * @return {mixed} a formatted value
 */
function formatDisplayValue(value, type) {
    switch (type.toLowerCase()) {
    case 'percentage':
        return value.toFixed(3) + '%';
    case 'money':
        return '$' + value.toFixed(2);
    default:
        return value;
    }
}

/**
 * Get the Lenda result.
 *
 * @param {number} term the new term
 *
 * @return {object} the result using the Lenda API, undefined if it
 *     does not exist
 */
function getLendaResult(term) {
    var lendaApi = new LendaAPI();
    try {
        return lendaApi.getRateAndCostForTerm(term)
    } catch (e) {
        return undefined;
    }
}

/**
 * Get the Quicken result.
 *
 * @param {number} term the new term
 *
 * @return {object} the result using the Quicken API, undefined if it
 *     does not exist
 */
function getQuickenResult(term) {
    var rates = getQuickenRates();
    rates = rates.filter(function (rate) {
        return rate.term === term;
    });

    return rates[0];
}

/**
 * Get the Wells Fargo result.
 *
 * @param {number} term the new term
 *
 * @return {object} the result using the Wells Fargo API, undefined if it
 *     does not exist
 */
function getWellsFargoResult(term) {
    var wellsFargoApi = new WellsFargoAPI();
    var rates = wellsFargoApi.getRatesAndCost().rates;

    rates = rates.filter(function (rate) {
        return rate.term === term;
    });

    return rates[0];
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

/**
 * Calculate the total savings.
 *
 * @param {number} currentMonthlyPayment the current monthly payment
 * @param {number} newMonthlyPayment the new monthly payment
 * @param {number} totalPayments the total number of payments
 * @param {number} closingCosts the closing costs
 *
 * @return {number} the total savings
 */
function calculateTotalSavings(currentMonthlyPayment, newMonthlyPayment,
                               totalPayments, closingCosts) {
    return currentMonthlyPayment * totalPayments - newMonthlyPayment *
        totalPayments - closingCosts;
}
