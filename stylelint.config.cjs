module.exports = {
  extends: ['stylelint-config-standard'],
  rules: {
    'color-hex-length': 'long',
    'selector-class-pattern': [
      '^[a-z0-9\-]+$',
      {
        message: 'Expected class selector to be kebab-case'
      }
    ]
  }
};
