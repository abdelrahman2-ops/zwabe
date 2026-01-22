// agodaService.ts
import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()


export async function getHotelPrices(data) {
  console.log('SITE:', process.env.AGODA_SITE_ID)
  console.log('KEY:', process.env.AGODA_API_KEY)

  const res = await axios.post(
    'http://affiliateapi7643.agoda.com/affiliateservice/lt_v1',

    {

      criteria: {
        hotelId: data.hotelIds,
        checkInDate: data.checkIn,
        checkOutDate: data.checkOut,
        additional: {
          currency: "SAR",
          language: "ar-ae",
          occupancy: {
            numberOfAdult: data.adults,
            numberOfChildren: data.children
          }
        }
      }
    },

    {
      headers: {
        'Accept-Encoding': 'gzip,deflate',
        'Content-Type': 'application/json',
        Authorization: `${process.env.AGODA_SITE_ID}:${process.env.AGODA_API_KEY}`
      }
    }
  )

  return res.data.hotels
}

export async function searchHotelsByCity(cityId, checkIn, checkOut, guests) {
  const res = await agodaClient.post('', {
    criteria: {
      cityId: cityId,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      additional: {
        currency: "SAR",
        language: "ar-ae",
        occupancy: {
          numberOfAdult: guests.adults,
          numberOfChildren: guests.children
        },
        sortBy: "PriceAsc",
        maxResult: 20
      }
    }
  });
  return res.data.hotels;
}

export async function getHotelsByIds(hotelIds, checkIn, checkOut, guests) {
  const res = await agodaClient.post('', {
    criteria: {
      hotelId: hotelIds,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      additional: {
        currency: "SAR",
        language: "ar-ae",
        occupancy: {
          numberOfAdult: guests.adults,
          numberOfChildren: guests.children
        }
      }
    }
  });
  return res.data.hotels;
}