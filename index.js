/**
 * A Set polyfill optimized for file size and simplicity.
 *
 * Notes:
 * - Performance might be an issue if dealing with large sets,
 *   as adding a new item will take more time.
 * - Only a small subset of the ES6 spec is implemented,
 *   but if you don't use weird JS stuff like NaN
 *   you should be fine.
 */
export default function Set(elements = []) {
    this.size = 0;
    [].forEach.call(elements, (element) => this.add(element));
}

Set.prototype = [];

Set.prototype.add = function(element) {
    if (this.indexOf(element) !== -1) {
        return this;
    }
    this.push(element);
    this.size++;
    return this;
};

Set.prototype.clear = function() {
    this.length = this.size = 0;
};

Set.prototype.delete = function(element) {
    const index = this.indexOf(element);
    if (index === -1) {
        return false;
    }
    this.splice(index, 1);
    return true;
};

Set.prototype.values = Set.prototype.keys = Set.prototype.entries = function() {
    return this.slice();
};

Set.prototype.forEach = function(callbackFn, thisArg = this) {
    return [].forEach(val => callbackFn.call(thisArg, val, val));
};

Set.prototype.has = function(element) {
    return this.indexOf(element) !== -1;
};


