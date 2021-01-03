module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'react/prop-types': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-console': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'no-underscore-dangle': 'off',
    'import/prefer-default-export': 'off',
    'max-len': ['error', 180, 2],
    'object-curly-newline': ['error', {multiline: true, minProperties: 5}],
    'arrow-body-style': 'off',
    'match-default-export-name': 'off',
    'no-param-reassign': 'off',
    'func-names': 'off',
    'consistent-return': 'off',
    'naming-convention': 'off',
  },
};
