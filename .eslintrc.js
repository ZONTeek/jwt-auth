module.exports = {
    root: true,
    env: { jest: true },
    parser: "babel-eslint",
    extends: ['plugin:react/recommended'],
    plugins: ['react', "jest"],
    rules: {
        'no-multi-spaces': ['error'],
        'no-unused-vars': ['warn'],
        "react/prop-types": 1,
        'quotes': ['warn', 'single'],
        'no-multiple-empty-lines': ['error', { max: 2 }],
        'comma-dangle': ['error', 'never']
        //indent: ['error', 4]
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
                moduleDirectory: ['node_modules', 'src/']
            }
        }
    }
};
