var ex = {
    currentMonthlyPayment: 976,
    currentInterestRate: 0.04075,
    loanAmount: 273224,
    monthsRemaining: 20,
    newTerm: 10
};

var testValues = [
    {
        term: 10,
        lendaRate: 3.900,
        lendaClosingCosts: 0,
        lendaNewPayment: 2753.29,
        wellsFargoRate: 4.125,
        wellsFargoClosingCosts: 1275.00,
        quickenRate: 4.075,
        quickenClosingCosts: 950.00,
    },
    {
        term: 15,
        lendaRate: 4.000,
        lendaClosingCosts: 0,
        lendaNewPayment: 2021.00,
        wellsFargoRate: 4.275,
        wellsFargoClosingCosts: 1375.00,
        quickenRate: 4.130,
        quickenClosingCosts: 1000.00
    },
    {
        term: 20,
        lendaRate: 4.100,
        lendaClosingCosts: 0,
        lendaNewPayment: 1670.12,
        wellsFargoRate: 4.391,
        wellsFargoClosingCosts: 1475.00,
        quickenRate: 4.223,
        quickenClosingCosts: 1050.00
    },
    {
        term: 30,
        lendaRate: 4.200,
        lendaClosingCosts: 0,
        lendaNewPayment: 1336.11,
        wellsFargoRate: 4.411,
        wellsFargoClosingCosts: 1575.00,
        quickenRate: 4.397,
        quickenClosingCosts: 1100.00
    }
];

describe('Display value formatting', function () {
    it('should format a percentage', function () {
        expect(formatDisplayValue(100, 'percentage')).toBe('100.000%');
    });

    it('should format a dollar amount', function () {
        expect(formatDisplayValue(200, 'money')).toBe('$200.00');
    });

    it('should return the input if the type is not recognised', function () {
        expect(formatDisplayValue(1234, 'foo')).toBe(1234);
    });
});

describe('API results', function () {
    testValues.forEach(function (test) {
        var lendaResult, wellsFargoResult, quickenResult;

        lendaResult = getLendaResult(test.term);
        wellsFargoResult = getWellsFargoResult(test.term);
        quickenResult = getQuickenResult(test.term);

        it('should get the correct rate for ' + test.term + ' years from the Lenda API', function () {
            expect(lendaResult.rate).toEqual(test.lendaRate);
        });

        it('should get the correct rate for ' + test.term + ' years from the Wells Fargo API', function () {
            expect(wellsFargoResult.rate).toEqual(test.wellsFargoRate);
        });

        it('should get the correct rate for ' + test.term + ' years from the Quicken API', function () {
            expect(quickenResult.rate).toEqual(test.quickenRate);
        });

        it('should get the correct closing costs for ' + test.term + ' years from the Lenda API', function () {
            expect(lendaResult.cost).toEqual(test.lendaClosingCosts);
        });

        it('should get the correct closing costs for ' + test.term + ' years from the Wells Fargo API', function () {
            expect(wellsFargoResult.cost).toEqual(test.wellsFargoClosingCosts);
        });

        it('should get the correct closing costs for ' + test.term + ' years from the Quicken API', function () {
            expect(quickenResult.cost).toEqual(test.quickenClosingCosts);
        });
    });
});

describe('New payment and savings calculation', function () {
});
