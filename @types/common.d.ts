type llSettings = {
    website: {
        port: {
            http: number;
            https: number;
        };
    }
}

declare module NodeJS {
    interface Global {
        settings: llSettings;
    }

    interface ProcessEnv {
        NODE_ENV: 'development' | 'production';
    }
}