# es6-simple-set

A Set polyfill optimized for file size and simplicity.

Notes:
- Performance might be an issue if dealing with large sets,
  as adding a new item will take more time.
- Only a small subset of the ES6 spec is implemented.
  but if you don't use weird JS stuff like NaN
  you should be fine. Also, iterators are not supported.