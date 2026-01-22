import xlsx from 'xlsx';
import { transformCountryRow } from '../utils/excelTransform.util.js';
import * as cityService from './city.js';
import * as countryService from './country.js';
import * as hotelService from './hotel.js';
import * as tourService from './tour.js';
import * as packageService from './package.js';
import * as packageTypeService from './packageType.js';
import * as serviceService from './service.js';
import * as airlineService from './airline.js';
import * as userService from './user.js';
import * as blogService from './blog.js';
import * as flightBookingService from './flightBooking.js';
import * as seoPageService from './seopage.service.js';
import * as offerService from './offer.js';
import * as messageService from './message.service.js';
import * as settingsService from './settings.js';

const serviceMap = {
  city: cityService,
  country: countryService,
  hotel: hotelService,
  tour: tourService,
  package: packageService,
  packageType: packageTypeService,
  service: serviceService,
  airline: airlineService,
  user: userService,
  blog: blogService,
  flightBooking: flightBookingService,
  seopage: seoPageService,
  offer: offerService,
  message: messageService,
  settings: settingsService
};

export async function importExcel({ model, buffer }) {
  const service = serviceMap[model];
  if (!service) throw new Error('Invalid model');
  const workbook = xlsx.read(buffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rows = xlsx.utils.sheet_to_json(sheet);
  let results = [];
  for (const row of rows) {
    let transformedRow = row;
    if (model === 'country') {
      transformedRow = transformCountryRow(row);
    }
    const doc = await service.createOne(transformedRow);
    results.push(doc);
  }
  return results;
}
