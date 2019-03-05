import { scrapeMps } from './index';
import * as mockGetMp from './src/mp';
import { MP } from './typings/mp';
// import getMp, { MP } from './src/mp';
import colors from 'colors/safe';

jest.mock('./src/index');
jest.mock('./src/mp');
jest.mock('colors');
console.log = jest.fn();

describe('scrapeMps', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('return an array of mps', async () => {
    const mockLinks = [
      'https://www.parliament.uk/biographies/commons/nigel-adams/4057',
    ];

    const mockMp: MP = {
      addressAs: 'Nigel Adams',
      constituency: 'Selby and Ainsty',
      email: 'nigel.adams.mp@parliament.uk',
      name: 'Nigel Adams MP',
      party: 'Conservative',
      twitter: {
        handler: null,
        url: null,
      },
      website: 'http://www.selbyandainsty.com/',
    };

    const mockMps = [mockMp];
    const getMpSpy = jest.spyOn(mockGetMp, 'default');
    getMpSpy.mockResolvedValueOnce(Promise.resolve(mockMp));
    const mps = await scrapeMps(mockLinks);
    expect(mps).toEqual(mockMps);
  });
});
