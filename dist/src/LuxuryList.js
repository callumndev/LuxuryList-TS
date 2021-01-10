"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
process.env.NODE_ENV = process.argv.includes('--development') ? 'development' : 'production';
const express_1 = __importDefault(require("express"));
const lodash_1 = require("lodash");
const path_1 = __importDefault(require("path"));
const settings_json_1 = __importDefault(require("../settings.json"));
const settings_dev_json_1 = __importDefault(require("../settings-dev.json"));
global.settings = process.env.NODE_ENV == 'development' ?
    lodash_1.merge(settings_json_1.default, settings_dev_json_1.default) :
    settings_json_1.default;
const app = express_1.default();
app.port = global.settings.website.port.http;
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, '..', '..', 'views'));
app.use(express_1.default.static(path_1.default.join(__dirname, '..', '..', 'public')));
app.get('/', (req, res) => {
    res.render('hello.ejs');
});
app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).send('Something Broke! All I know is: ' + error.message.replace(__dirname, ''));
});
console.log(global.settings);
app.listen(app.port, () => console.log('[LuxuryList] Ready on port ' + app.port + '. http' + (process.env.NODE_ENV == 'development' ? '' : 's') + '://localhost:' + app.port));
