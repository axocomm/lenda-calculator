module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'assets/js/jquery.min.js',
            'assets/js/lenda.js',
            'assets/js/quicken.js',
            'assets/js/wellsfargo.js',
            'assets/js/calculator.js',
            'assets/js/tests.js'
        ],
        browsers: ['PhantomJS'],
        singleRun: true,
        reporters: ['progress', 'coverage'],
        preprocessors: {
            'assets/js/calculator.js': ['coverage']
        }
    });
}
