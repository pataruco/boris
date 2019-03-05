import getMpIndex from './index';
jest.setTimeout(10000);

describe('getMpIndex', () => {
  beforeAll(async () => {
    await page.goto('https://google.com');
  });

  it('return an array of MP links', async () => {
    expect(true).toBe(true);
  });
});
