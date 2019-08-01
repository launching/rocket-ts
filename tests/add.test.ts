import add from '../src/utils/add';
describe('add 1 + 1', () => {
  it('test', () => {
    const sum = add(1, 1);
    expect(sum).toBe(2);
  });

  it('test string add', () => {
    const sum = add(2, 2);
    expect(sum).toBe(4);
  });
});
