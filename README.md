# lenda-calculator

This is a very simple calculator that calculates savings based on refinance rates and closing costs of Lenda, Wells Fargo, and Quicken.

Current information is entered in the form at the top and results appear in the forms below.

## Formulae
### Monthly Payment
<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
<mrow><mi>P</mi> <mfenced open='('  close=')' ><mrow><mfrac linethickness="1"><mrow><mrow><mi>i</mi><mo>(</mo><mn>1</mn><mo>+</mo><mi>i</mi><msup><mrow><mo>)</mo></mrow><mrow><mi>n</mi></mrow></msup></mrow></mrow><mrow><mrow><mo>(</mo><mn>1</mn><mo>+</mo><mi>i</mi><msup><mrow><mo>)</mo></mrow><mrow><mi>n</mi></mrow></msup><mo>-</mo><mn>1</mn></mrow></mrow></mfrac></mrow></mfenced></mrow></math>

where
- <math><mi>P</mi></math> is the loan amount
- <math><mi>i</mi></math> is the monthly interest rate
- <math><mi>n</mi></math> is the new term of the loan, in months

### Savings
<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
<mrow><msub><mrow><mi>p</mi></mrow><mrow><mi>c</mi></mrow></msub><mi>t</mi><mo>-</mo><msub><mrow><mi>p</mi></mrow><mrow><mi>n</mi></mrow></msub><mo>-</mo><mi>c</mi></mrow></math>

where
- <math><msub><mrow><mi>p</mi></mrow><mrow><mi>c</mi></mrow></msub></math> is the current monthly payment
- <math><msub><mrow><mi>p</mi></mrow><mrow><mi>n</mi></mrow></msub></math> is the new monthly payment
- <math><mi>t</mi></math> is the number of remaining payments, in months
- <math><mi>c</mi></math> is the closing costs

## Testing
[Jasmine](http://jasmine.github.io/) is used for testing. Test cases are located at `assets/js/tests.js` and the suite may be run by visiting `tests.html`. Code coverage is provided by Karma and the [karma-jasmine](https://github.com/karma-runner/karma-jasmine) adapter. Results of the latest run of the suite can be viewed in the `coverage` directory and may be run as follows:

- Install Karma and the adapter
	```
	npm install karma karma-coverage
	npm install karma-jasmine@2_0 --save-dev
	```
	
- Optionally, install PhantomJS and the launcher
	```
	brew install phantomjs
	npm install karma-phantomjs-launcher
	```
- Install the Jasmine library
	```
	npm install jasmine-core --save-dev
	```
- Run the Karma server
	```
	node_modules/karma/bin/karma start karma.conf.js
	```
	If you are using PhantomJS, Karma should generate the coverage and exit automatically. Otherwise, you should visit the URL it is listening on, e.g. `http://localhost:9876`. Results can be viewed in the `coverage` directory.