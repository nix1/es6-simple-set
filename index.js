/**
 * A Set polyfill optimized for file size and simplicity.
 *
 * @module
 * @author Paweł Sierszeń
 * @license The MIT License (MIT)
 */

/**
 * Set constructor
 * @param {[Iterable]} values
 * @constructor
 */
export default function Set(values = []) {
    this.size = 0;
    [].forEach.call(values, (value) => this.add(value));
}

Set.prototype = [];
Set.prototype.constructor = Set;

/**
 * Append a new value to the set.
 * @param {*} value The value to add to the set.
 * @returns {Set}
 */
Set.prototype.add = function(value) {
    if (this.indexOf(value) !== -1) {
        return this;
    }
    this.push(value);
    this.size++;
    return this;
};

/**
 * Delete all values from the set.
 */
Set.prototype.clear = function() {
    this.length = this.size = 0;
};

/**
 * Delete a value from the set.
 * @param {*} value The value to remove from the set.
 * @returns {boolean}
 */
Set.prototype.delete = function(value) {
    const index = this.indexOf(value);
    if (index === -1) {
        return false;
    }
    this.splice(index, 1);
    this.size--;
    return true;
};

/**
 * Get values from the set.
 * @returns {Array}
 */
Set.prototype.values = Set.prototype.keys = [].slice;

/**
 * Get entries from the set.
 * @returns {Array}
 */
Set.prototype.entries = function() {
    const entries = [];
    [].forEach.call(this, value => {
        entries.push([value, value])
    });
    return entries;
};

/**
 * Execute a provided function for each value
 * in the set in insertion order.
 * @param {function} callbackFn
 * @param {[*]} thisArg
 */
Set.prototype.forEach = function(callbackFn, thisArg = this) {
    [].forEach.call(this, value => callbackFn.call(thisArg, value, value));
};

/**
 * Check if the value exists in the set.
 * @param {*} value The value to be checked for existence.
 * @returns {boolean}
 */
Set.prototype.has = function(value) {
    return this.indexOf(value) !== -1;
};
