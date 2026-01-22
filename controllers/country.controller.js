import Country from "../models/Country.js";
import { getCountryBySlug } from "../services/country.js"
import { createOne, deleteOne, getAll, getOne, updateOne } from "../utils/handlerFactory.js"
import { successResponse, errorResponse } from "../utils/responseHandler.js"
import XLSX from "xlsx";


export const getAllCountries = getAll('country')

export const addCountry = createOne('country')

export const getCountry = getOne('country')

export const updateCountry = updateOne('country')

export const deleteCountry = deleteOne('country')





export const getCountryDetails = async (req, res, next) => {
    const { countrySlug } = req.params
    const country = await getCountryBySlug(countrySlug)
    if (!country) {
        return errorResponse(res, 404, 'Not country found with this slug')
    }

    return successResponse(res, 200, 'all country details', country)
}


export const bulkInsertCountries = async (req, res) => {
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

    const countries = rows.map(row => {
      const fixed = {};
      for (let key in row) {
        fixed[normalize(key)] = row[key];
      }

      return {
        name: fixed.name,
        continent: fixed.continent,
        currency: fixed.currency,
        language: fixed.language,
        description: fixed.description,
        desctext: fixed.desctext,
        favMonth: fixed.favmonth ? String(fixed.favmonth).split(",") : [],
        isActive: fixed.isactive !== undefined ? fixed.isactive : true,
        slug: fixed.slug,
        alt: fixed.alt
      };
    });

    await Country.insertMany(countries);

    res.json({
      message: "Countries inserted successfully",
      count: countries.length,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error importing data", error });
  }
};
