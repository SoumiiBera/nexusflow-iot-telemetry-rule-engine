const VALID_OPERATORS = ['>', '<', '==', '>=', '<='];
const VALID_SEVERITIES = ['Warning', 'Critical'];

const REQUIRED_FIELDS = [
  'ruleId',
  'ruleName',
  'deviceId',
  'metric',
  'operator',
  'threshold',
  'severity',
  'enabled'
];

function validateRule(rule) {
  const errors = [];

  if (!rule || typeof rule !== 'object' || Array.isArray(rule)) {
    return {
      valid: false,
      errors: ['Rule must be a valid object.']
    };
  }

  for (const field of REQUIRED_FIELDS) {
    if (rule[field] === undefined || rule[field] === null) {
      errors.push(`${field} is required.`);
    }
  }

  if (typeof rule.ruleId !== 'string' || !rule.ruleId.trim()) {
    errors.push('ruleId must be a non-empty string.');
  }

  if (typeof rule.ruleName !== 'string' || !rule.ruleName.trim()) {
    errors.push('ruleName must be a non-empty string.');
  }

  if (typeof rule.deviceId !== 'string' || !rule.deviceId.trim()) {
    errors.push('deviceId must be a non-empty string.');
  }

  if (typeof rule.metric !== 'string' || !rule.metric.trim()) {
    errors.push('metric must be a non-empty string.');
  }

  if (!VALID_OPERATORS.includes(rule.operator)) {
    errors.push('Invalid comparison operator.');
  }

  if (typeof rule.threshold !== 'number' || !Number.isFinite(rule.threshold)) {
    errors.push('threshold must be a finite number.');
  }

  if (!VALID_SEVERITIES.includes(rule.severity)) {
    errors.push('Severity must be Warning or Critical.');
  }

  if (typeof rule.enabled !== 'boolean') {
    errors.push('enabled must be a boolean.');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

module.exports = {
  validateRule,
  VALID_OPERATORS,
  VALID_SEVERITIES
};