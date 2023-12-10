// .eslintrc.js
module.exports = {
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
    },
  };
  
{
    "name": "your-project-name",
    "version": "1.0.0",
    "description": "Your project description",
    "main": "platform_N.js",
    "scripts": {
        "test": "mocha test/**/*.test.js",
        "lint": "eslint .",
        "build": "npm run lint && npm test"
      },
      
    "author": "Nazanin",
    "license": "MIT",
    "devDependencies": {
        "@typescript-eslint/eslint-plugin": "^6.13.2",
        "chai": "^4.3.10",
        "eslint": "^8.55.0",
        "eslint-plugin-react": "^7.33.2",
        "jsdom": "^16.7.0",
        "konva": "^8.4.3",
        "mocha": "^9.2.2",
        "sinon": "^17.0.1"
    },
    "dependencies": {
        "jsdom-global": "^3.0.2",
        "konva-node": "^0.11.2"
    }
}

