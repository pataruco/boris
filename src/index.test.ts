import getMpIndex from './index';
jest.setTimeout(10000);

describe('getMpIndex', () => {
  it('return an array of MP links', async () => {
    const mps = await getMpIndex();

    expect(Array.isArray(mps)).toBe(true);
    expect(mps.length > 600).toBe(true);
    expect(
      mps.includes(
        'https://www.parliament.uk/biographies/commons/nigel-adams/4057',
      ),
    ).toBe(true);
  });
});
