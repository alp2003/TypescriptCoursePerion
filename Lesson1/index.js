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
        while (_) try {
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
var _this = this;
var fs = require("fs");
var promises = require("fs").promises;
var LEADS_FOLDER_PATH = "./LEADS/";
console.time("read_files");
var getFilesList = function () { return __awaiter(_this, void 0, void 0, function () {
    var filesList;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, promises.readdir(LEADS_FOLDER_PATH)];
            case 1:
                filesList = _a.sent();
                return [2 /*return*/, filesList];
        }
    });
}); };
var readFiles = function () { return __awaiter(_this, void 0, void 0, function () {
    var filesList, bufferPromiseList, fileUsersStrArray, _i, bufferPromiseList_1, bufferPromise, buff, fileUsersBuffer, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                return [4 /*yield*/, getFilesList()];
            case 1:
                filesList = _a.sent();
                console.log(filesList);
                return [4 /*yield*/, filesList.map(function (file) {
                        return promises.readFile(LEADS_FOLDER_PATH + file);
                    })];
            case 2:
                bufferPromiseList = _a.sent();
                fileUsersStrArray = [];
                _i = 0, bufferPromiseList_1 = bufferPromiseList;
                _a.label = 3;
            case 3:
                if (!(_i < bufferPromiseList_1.length)) return [3 /*break*/, 6];
                bufferPromise = bufferPromiseList_1[_i];
                return [4 /*yield*/, bufferPromise];
            case 4:
                buff = _a.sent();
                fileUsersBuffer = buff.toString().split("\r\n");
                fileUsersStrArray = __spreadArray(__spreadArray([], fileUsersStrArray, true), fileUsersBuffer, true);
                _a.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 3];
            case 6: return [2 /*return*/, fileUsersStrArray];
            case 7:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/, []];
        }
    });
}); };
var strArrayToMap = function (strArray) {
    var map = new Map();
    return new Promise(function (res, rej) {
        for (var _i = 0, strArray_1 = strArray; _i < strArray_1.length; _i++) {
            var userStr = strArray_1[_i];
            var _a = userStr.split(","), facebook_id = _a[0], full_name = _a[1], email = _a[2];
            map.set(facebook_id, {
                facebook_id: facebook_id,
                full_name: full_name.replace(/['"]+/g, ""),
                email: email
            });
        }
        res(map);
    });
};
var mapToUsersArray = function (map) {
    var users = [];
    return new Promise(function (res, rej) {
        for (var _i = 0, _a = Array.from(map.entries()); _i < _a.length; _i++) {
            var entry = _a[_i];
            var key = entry[0];
            var value = entry[1];
            users.push(value);
        }
        res(users);
    });
};
var strArrayToUsersArray = function (strArray) {
    var unique = {};
    var users = [];
    return new Promise(function (res, rej) {
        for (var _i = 0, strArray_2 = strArray; _i < strArray_2.length; _i++) {
            var userStr = strArray_2[_i];
            var _a = userStr.split(","), facebook_id = _a[0], full_name = _a[1], email = _a[2];
            if (!unique[facebook_id]) {
                unique[facebook_id] = true;
                users.push({
                    facebook_id: facebook_id,
                    full_name: full_name.replace(/['"]+/g, ""),
                    email: email
                });
            }
        }
        res(users);
    });
};
var filesToJsonFile = function () { return __awaiter(_this, void 0, void 0, function () {
    var filesUsersStrArray, users, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, readFiles()];
            case 1:
                filesUsersStrArray = _a.sent();
                return [4 /*yield*/, strArrayToUsersArray(filesUsersStrArray)];
            case 2:
                users = _a.sent();
                console.log("Number of Users: ".concat(users.length));
                return [4 /*yield*/, promises.writeFile("results.json", JSON.stringify(users))];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                console.log(error_2);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
filesToJsonFile();
console.timeEnd("read_files");
