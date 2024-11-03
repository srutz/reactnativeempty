module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: ["nativewind/babel",
            ['module:react-native-dotenv', {
                moduleName: '@env',
                path: '.env.local',
                blacklist: null,
                whitelist: null,
                safe: true,
                allowUndefined: false,
            }],
        ],
    };
};
