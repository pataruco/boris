import colors from 'colors/safe';
import fs from 'fs';
import { Lord } from '../../typings/lord';
import { MP } from '../../typings/mp';
type House = 'commons' | 'lords';

export const saveFileForHouse = async (house: House, data: MP[] | Lord[]) => {
  const object = {
    updatedAt: new Date().toDateString(),
    [`${house}`]: data,
  };

  try {
    await fs.writeFileSync(`./data/${house}.json`, JSON.stringify(object));
    // tslint:disable-next-line:no-console
    console.log(colors.yellow(`The ${house} data was saved!`));
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.error(colors.red(JSON.stringify(error)));
    throw error;
  }
};

export default saveFileForHouse;
