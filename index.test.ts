import { MP } from './typings/mp';
import * as mockGetMp from './src/mp';
import * as mockGetMpIndex from './src/index';
import start, { scrapeMps } from './index';

jest.mock('colors');
console.log = jest.fn();

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

describe('scrapeMps', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('return an array of mps', async () => {
    const getMpSpy = jest.spyOn(mockGetMp, 'default');

    getMpSpy.mockResolvedValueOnce(Promise.resolve(mockMp));

    const mps = await scrapeMps(mockLinks);
    expect(mps).toEqual(mockMps);
  });
});

describe('start', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('start the scrapping process', async () => {
    const getMpIndexSpy = jest.spyOn(mockGetMpIndex, 'default');
    getMpIndexSpy.mockResolvedValueOnce(Promise.resolve(mockLinks));

    const saveMembersInAFilefn = jest.fn();
    await start(saveMembersInAFilefn);

    expect(getMpIndexSpy).toBeCalled();
    expect(saveMembersInAFilefn).toBeCalled();
  });
});
