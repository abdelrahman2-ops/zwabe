import Package from "../models/Package.js"
import { getCityBySlug } from "../services/city.js"
import { getCityPackages, getPackageBySlug } from "../services/package.js"
import { createOne, deleteOne, getAll, getOne, updateOne } from "../utils/handlerFactory.js"
import { successResponse } from "../utils/responseHandler.js"

export const getAllCities = getAll('city')

export const addCity = createOne('city')

export const getCity = getOne('city')

export const updateCity = updateOne('city')

export const deleteCity = deleteOne('city')



export const getCityDetails = async (req, res, next) => {
    const { citySlug } = req.params
    const city = await getCityBySlug(citySlug)
    if (!city) {
        return errorResponse(res, 404, "City not found");
    }
    const packages = await getCityPackages(city._id) 
    const apiKey = process.env.OPENWEATHER_API_KEY
    if (!apiKey) {
        return successResponse(res, 200, undefined, { ...city, ...packages })
    }
    const weather = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city.name)}&appid=${apiKey}&units=metric&lang=ar`);
    const cityWeather = await weather.json()
    return successResponse(res, 200, undefined, {
        city: city.toObject(),
        packages: packages.map(p => p.toObject()),
        cityWeather
    })
}


export const bulkInsertCities = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload an Excel file" });
    }

    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const rows = XLSX.utils.sheet_to_json(sheet);
    console.log('rows', rows)

    const normalize = (str = "") =>
      String(str).trim().toLowerCase().replace(/\s+/g, "");

    const cities = rows.map(row => {
      const fixed = {};
      for (let key in row) {
        fixed[normalize(key)] = row[key];
      }

      return {
        name: fixed.name,
        code: fixed.code,
        continent: fixed.continent,
        currency: fixed.currency,
        language: fixed.language,
        description: fixed.description,
        desctext: fixed.desctext,
        favTime: fixed.favtime ? String(fixed.favtime).split(",") : [],
        favMonth: fixed.favmonth ? String(fixed.favmonth).split(",") : [],
        isActive: fixed.isactive !== undefined ? fixed.isactive : true,
        slug: fixed.slug,
        alt: fixed.alt
      };
    });

    await City.insertMany(cities);

    res.json({
      message: "Cities inserted successfully",
      count: cities.length,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error importing data", error });
  }
};
