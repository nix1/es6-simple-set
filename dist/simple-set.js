/**
 * A Set polyfill optimized for file size and simplicity.
 * Compiled to ES5 with Babel.
 *
 * @module
 * @author Paweł Sierszeń
 * @license The MIT License (MIT)
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Set;

/**
 * Set constructor
 * @param {[Iterable]} values
 * @constructor
 */
function Set() {
    var _this = this;

    var values = arguments[0] || [];

    this.size = 0;
    [].forEach.call(values, function (value) {
        return _this.add(value);
    });
}

Set.prototype = [];
Set.prototype.constructor = Set;

/**
 * Append a new value to the set.
 * @param {*} value The value to add to the set.
 * @returns {Set}
 */
Set.prototype.add = function (value) {
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
Set.prototype.clear = function () {
    this.length = this.size = 0;
};

/**
 * Delete a value from the set.
 * @param {*} value The value to remove from the set.
 * @returns {boolean}
 */
Set.prototype.delete = function (value) {
    var index = this.indexOf(value);
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
Set.prototype.entries = function () {
    var entries = [];
    [].forEach.call(this, function (value) {
        entries.push([value, value]);
    });
    return entries;
};

/**
 * Execute a provided function for each value
 * in the set in insertion order.
 * @param {function} callbackFn
 * @param {[*]} thisArg
 */
Set.prototype.forEach = function (callbackFn) {
    var thisArg = arguments[1] || this;

    [].forEach.call(this, function (value) {
        return callbackFn.call(thisArg, value, value);
    });
};

/**
 * Check if the value exists in the set.
 * @param {*} value The value to be checked for existence.
 * @returns {boolean}
 */
Set.prototype.has = function (value) {
    return this.indexOf(value) !== -1;
};