/*

- The asyncErrorBoundary function takes two parameters:
    *'delegate', which is an async/await handler or middleware function. This function will be called by the Boundary.
    *'defaultStatus' is an optional parameter that allows you to override the status code returned when delegate throws an error.
    *'asyncErrorBoundary' return an Express handler or middleware function , which is eventually called by Express in place of the 'delegate' function

*/

function asyncErrorBoundary(delegate, defaultStatus) {
    return (req, res, next) => {
        Promise.resolve()
            .then(() => delegate(req, res, next))
            .catch((error = {}) => {
                const { status = defaultStatus, message = error } = error;
                next({
                    status,
                    message
                });
            });
    };
}

module.exports = asyncErrorBoundary;