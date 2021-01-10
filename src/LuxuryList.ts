process.env.NODE_ENV = process.argv.includes('--development') ? 'development' : 'production';

import express, { Request, Response } from 'express'
import { merge } from 'lodash'
import path from 'path'

import settings from '../settings.json'
import settingsDev from '../settings-dev.json'

global.settings = process.env.NODE_ENV == 'development' ?
    merge(settings, settingsDev) :
    settings;

const app: express.Application = express();
app.port = global.settings.website.port.http;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', '..', 'views'));

app.use(express.static(path.join(__dirname, '..', '..', 'public')));

app.get('/', (req: Request, res: Response) => {
    res.render('hello.ejs')
})

app.use((error: any, req: Request, res: Response, next: any) => {
    console.error(error.stack);
    res.status(500).send('Something Broke! All I know is: ' + error.message.replace(__dirname, ''));
});

console.log(global.settings)

app.listen(app.port, () => console.log('[LuxuryList] Ready on port ' + app.port + '. http' + (process.env.NODE_ENV == 'development' ? '' : 's') + '://localhost:' + app.port));