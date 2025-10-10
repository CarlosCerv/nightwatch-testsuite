/**
 * Custom command to wait for element and retry on failure
 */
module.exports.command = function(selector, timeout = 10000, retries = 3) {
    let attemptCount = 0;
    
    const waitWithRetry = () => {
        return this.waitForElementVisible(selector, timeout)
            .catch(error => {
                attemptCount++;
                if (attemptCount < retries) {
                    console.log(`Retrying to find element ${selector}. Attempt ${attemptCount + 1} of ${retries}`);
                    return waitWithRetry();
                }
                throw error;
            });
    };

    return waitWithRetry()
        .then(() => {
            return this;
        });
};