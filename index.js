"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var express_validator_1 = require("express-validator");
var app = express_1.default();
app.use(body_parser_1.default.json());
app.use(cors_1.default());
var PORT = process.env.PORT || 3000;
var SECRET = "SIMPLE_SECRET";
app.post('/login', function (req, res) {
    var _a = req.body, username = _a.username, password = _a.password;
    // Use username and password to create token.
    if ({ username: username, password: password }) {
        return res.status(200).json({
            "message": 'Login succesfully',
            "token": cors_1.default
        });
    }
    else if (!{ username: username, password: password }) {
        return res.status(400).json({
            "message": "Invalid username or password"
        });
    }
});
app.post('/register', function (req, res) {
    var _a = req.body, username = _a.username, password = _a.password, firstname = _a.firstname, lastname = _a.lastname, balance = _a.balance;
    if ({ username: username, password: password, firstname: firstname, lastname: lastname, balance: balance }) {
        res.status(200).json({
            "message": "Register successfully"
        });
    }
    else if (!{ username: username, password: password, firstname: firstname, lastname: lastname, balance: balance }) {
        res.status(400).json({
            "message": "Username is already in used"
        });
    }
});
app.get('/balance', function (req, res) {
    var token = req.query.token;
    try {
        var username = jsonwebtoken_1.default.verify(token, SECRET).username;
        res.status(200).json({
            "name": "Peter Parker",
            "balance": 100
        });
    }
    catch (e) {
        //response in case of invalid token
        res.status(401).json({
            "message": "Invalid token"
        });
    }
});
app.post('/deposit', express_validator_1.body('amount').isInt({ min: 1 }), function (req, res) {
    //Is amount <= 0 ?
    if (!express_validator_1.validationResult(req).isEmpty())
        res.status(400).json({ message: "Invalid data" });
});
app.post('/withdraw', function (req, res) {
});
app.delete('/reset', function (req, res) {
    //  delete cors
    res.status(200).json({
        message: 'Reset database successfully'
    });
});
app.get('/me', function (req, res) {
    res.send({
        "firstname": "pitchaya",
        "lastname": "raihuay",
        "code": 620612159,
        "gpa": 4.00
    });
});
app.get('/demo', function (req, res) {
    res.status(200).json({
        message: 'This message is returned from demo route.'
    });
});
app.listen(PORT, function () { return console.log("Server is running at " + PORT); });
