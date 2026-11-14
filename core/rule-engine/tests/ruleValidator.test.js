const test = require('node:test');
const assert = require('node:assert/strict');

const {
  validateRule,
  VALID_OPERATORS,
  VALID_SEVERITIES
} = require('../ruleValidator');

const validRule = {
  ruleId: 'R001',
  ruleName: 'High Temperature Alert',
  deviceId: 'DEVICE001',
  metric: 'temperature',
  operator: '>',
  threshold: 40,
  severity: 'Critical',
  enabled: true
};

test('should accept a valid rule', () => {
  const result = validateRule(validRule);

  assert.equal(result.valid, true);
  assert.deepEqual(result.errors, []);
});

test('should reject a missing required field', () => {
  const rule = { ...validRule };
  delete rule.ruleId;

  const result = validateRule(rule);

  assert.equal(result.valid, false);
  assert.ok(result.errors.some(error => error.includes('ruleId is required')));
});

test('should reject an invalid operator', () => {
  const rule = { ...validRule, operator: '!=' };

  const result = validateRule(rule);

  assert.equal(result.valid, false);
  assert.ok(result.errors.includes('Invalid comparison operator.'));
});

test('should reject a non-numeric threshold', () => {
  const rule = { ...validRule, threshold: '40' };

  const result = validateRule(rule);

  assert.equal(result.valid, false);
  assert.ok(result.errors.includes('threshold must be a finite number.'));
});

test('should reject an invalid severity', () => {
  const rule = { ...validRule, severity: 'Low' };

  const result = validateRule(rule);

  assert.equal(result.valid, false);
  assert.ok(result.errors.includes('Severity must be Warning or Critical.'));
});

test('should reject a non-boolean enabled value', () => {
  const rule = { ...validRule, enabled: 'true' };

  const result = validateRule(rule);

  assert.equal(result.valid, false);
  assert.ok(result.errors.includes('enabled must be a boolean.'));
});

test('should reject an invalid rule object', () => {
  const result = validateRule(null);

  assert.equal(result.valid, false);
  assert.ok(result.errors.length > 0);
});

test('should expose supported operators and severities', () => {
  assert.deepEqual(VALID_OPERATORS, ['>', '<', '==', '>=', '<=']);
  assert.deepEqual(VALID_SEVERITIES, ['Warning', 'Critical']);
});