import puppeteer from 'puppeteer';
import getMp from '../mp/mp';

describe('getMp', () => {
  it('return an MP object', async () => {
    const mpUrl =
      'https://www.parliament.uk/biographies/commons/nigel-adams/4057';
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const mp = await getMp(page, mpUrl);

    const mockMp = {
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

    expect(mp).toEqual(mockMp);
  });
});
