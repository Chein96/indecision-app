import optionExists from '../../selectors/options';
import options from '../fixtures/options';

test('Should return true on option found', () => {
    const result = optionExists(options, options[1].description);
    expect(result).toBeTruthy();
});

test('Should return false on option not found', () => {
    const result = optionExists(options, 'newOption');
    expect(result).toBeFalsy();
});