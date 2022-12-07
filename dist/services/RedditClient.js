"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var RedditClient = /** @class */ (function () {
    function RedditClient(options) {
        this.accessToken = "";
        this.userAgent = "";
        this.authConfig = {
            method: "post",
            url: "https://www.reddit.com/api/v1/access_token",
            headers: {
                "User-Agent": this.userAgent,
            },
            auth: {
                username: "",
                password: "",
            },
            data: {},
        };
        this.requestConfig = {
            headers: {
                "User-Agent": this.userAgent,
                Authorization: "",
            },
        };
        if (!options.apiKey) {
            throw Error("API Key need to be provided");
        }
        if (!options.apiSecret) {
            throw Error("API Secret needs to be provided");
        }
        if (!options.userAgent) {
            throw Error("User Agent needs to be provided");
        }
        this.authConfig.auth = {
            username: options.apiKey,
            password: options.apiSecret,
        };
        this.setUserAgent(options.userAgent);
    }
    RedditClient.prototype.setToken = function (token) {
        this.accessToken = token;
    };
    RedditClient.prototype.setUserAgent = function (userAgent) {
        this.authConfig.headers["User-Agent"] = userAgent;
        this.requestConfig.headers["User-Agent"] = userAgent;
    };
    RedditClient.prototype.auth = function (authOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.authConfig.params = {
                            grant_type: "password",
                            username: authOptions.username,
                            password: authOptions.password,
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, (0, axios_1.default)(this.authConfig)];
                    case 2:
                        response = _a.sent();
                        this.setToken(response.data.access_token);
                        this.requestConfig.headers.Authorization = "Bearer ".concat(this.accessToken);
                        return [2 /*return*/, this];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1);
                        throw Error("Reddit auth call failed.");
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    RedditClient.prototype.getNewPosts = function (subreddit, afterParam, depth) {
        if (depth === void 0) { depth = 3; }
        return __awaiter(this, void 0, void 0, function () {
            var newDepth, response, parsedPosts, additionalPosts, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.accessToken) {
                            throw Error("Unable to make request. Authentication has not been established");
                        }
                        newDepth = depth - 1;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, axios_1.default.get("https://oauth.reddit.com/r/".concat(subreddit, "/new/?after=").concat(afterParam, "&limit=25"), this.requestConfig)];
                    case 2:
                        response = _a.sent();
                        parsedPosts = response.data.data.children;
                        afterParam = response.data.data.after;
                        if (!(afterParam && newDepth > 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.getNewPosts(subreddit, afterParam, newDepth)];
                    case 3:
                        additionalPosts = _a.sent();
                        return [2 /*return*/, __spreadArray(__spreadArray([], parsedPosts, true), additionalPosts, true)];
                    case 4: return [2 /*return*/, parsedPosts];
                    case 5:
                        error_2 = _a.sent();
                        console.log(error_2);
                        throw Error("getNewPosts error");
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    RedditClient.prototype.getPostComments = function (subbreddit, postID) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("https://oauth.reddit.com/r/".concat(subbreddit, "/comments/").concat(postID), this.requestConfig)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 2:
                        error_3 = _a.sent();
                        console.log(error_3);
                        throw Error("getNewPosts error");
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return RedditClient;
}());
exports.default = RedditClient;
