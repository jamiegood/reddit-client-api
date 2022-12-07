"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doGetRequest = exports.setOptions = void 0;
var credientials;
var setOptions = function (options) {
    if (!credientials) {
        credientials = options;
    }
};
exports.setOptions = setOptions;
var doGetRequest = function (url) {
    return "abc";
};
exports.doGetRequest = doGetRequest;
