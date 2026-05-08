/**
 * Checks if an element contains a specific text that matches exactly
 *
 * ```
 *    browser.assert.containsExactText('#main', 'The Night Watch')
 * ```
 *
 * @method containsExactText
 * @param {string} selector The selector (CSS / Xpath) used to locate the element.
 * @param {string} expectedText The text to look for.
 * @param {string} [message] Optional message to display in the output.
 * @api assertions
 */

exports.assertion = function(selector, expectedText, msg) {
    this.message = msg || `Testing if element <${selector}> contains exact text: "${expectedText}"`;
    this.expected = expectedText;

    this.pass = function(value) {
        return value.trim() === this.expected;
    };

    this.value = function(result) {
        return result.value;
    };

    this.command = function(callback) {
        return this.api.getText(selector, callback);
    };
};
