function wrapAsync(fn) {
    return function (req, res, next) {
        console.log(fn); // To debug what is passed
        return Promise.resolve(fn(req, res, next)).catch(next);
    };
}
module.exports = wrapAsync;
