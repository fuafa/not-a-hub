import { camel2dash } from '../utils/utils';

test("CamelToDash should be camel-to-dash", () => {
  expect(camel2dash('CamelToDash')).toBe('camel-to-dash');
});
