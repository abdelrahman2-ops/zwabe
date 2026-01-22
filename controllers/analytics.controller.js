import Airline from "../models/Airline.js";
import Blog from "../models/Blog.js";
import City from "../models/City.js";
import Country from "../models/Country.js";
import Hotel from "../models/Hotel.js";
import Offer from "../models/Offer.js";
import Package from "../models/Package.js";
import Tour from "../models/Tour.js";
import axios from 'axios'

export const analytics = async (req, res, next) => {
    const firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const [
        blogs, tours, packages, hotels, cities, offers, airLines,
        blogsAddedThisMonth, offersAddedThisMonth, countriesAddedThisMonth,
        hotelsAddedThisMonth, packagesAddedThisMonth, toursAddedThisMonth
    ] = await Promise.all([
        Blog.countDocuments(),
        Tour.countDocuments(),
        Package.countDocuments(),
        Hotel.countDocuments(),
        City.countDocuments(),
        Offer.countDocuments(),
        Airline.countDocuments(),
        Blog.countDocuments({ createdAt: { $gte: firstDayOfMonth } }),
        Offer.countDocuments({ createdAt: { $gte: firstDayOfMonth } }),
        Country.countDocuments({ createdAt: { $gte: firstDayOfMonth } }),
        Hotel.countDocuments({ createdAt: { $gte: firstDayOfMonth } }),
        Package.countDocuments({ createdAt: { $gte: firstDayOfMonth } }),
        Tour.countDocuments({ createdAt: { $gte: firstDayOfMonth } })
    ]);

    res.status(200).json({
        status: 'success',
        data: {
            totals: { blogs, tours, packages, hotels, cities, offers, airLines },
            recent: {
                blogsAddedThisMonth,
                offersAddedThisMonth,
                countriesAddedThisMonth,
                hotelsAddedThisMonth,
                hotelsAddedThisMonth,
                packagesAddedThisMonth,
                toursAddedThisMonth
            }
        }
    });

}







export const getFacebookAnalytics = async (req, res, next) => {
  const { adAccountId, accessToken } = req.body;

  try {
    const url = `https://graph.facebook.com/v18.0/act_${adAccountId}/insights
      ?fields=impressions,clicks,spend,actions
      &date_preset=last_7d
      &access_token=${accessToken}`;

    const response = await axios.get(url);

    res.json({
      platform: "facebook",
      data: response.data.data
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};






export const getTiktokAnalytics = async (req, res, next) => {
  const { advertiserId, accessToken } = req.body;

  try {
    const url = "https://business-api.tiktokglobalshop.com/open_api/v1.3/report/integrated/get/";

    const response = await axios.post(url, {
      advertiser_id: advertiserId,
      report_type: "BASIC",
      data_level: "AUCTION_ADVERTISER",
      dimensions: ["STAT_TIME_DAY"],
      metrics: ["impressions", "clicks", "spend", "conversions"],
      start_date: "2025-09-01",
      end_date: "2025-09-25"
    }, {
      headers: { "Access-Token": accessToken }
    });

    res.json({
      platform: "tiktok",
      data: response.data.data
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};








export const getTwitterAnalytics = async (req, res, next) => {
  const { accountId, accessToken } = req.body;

  try {
    const url = `https://ads-api.twitter.com/12/stats/accounts/${accountId}`;
    
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: {
        granularity: "DAY",
        metric_groups: "ENGAGEMENT,BILLING",
        start_time: "2025-09-01T00:00:00Z",
        end_time: "2025-09-25T23:59:59Z"
      }
    });

    res.json({
      platform: "twitter",
      data: response.data.data
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};











export const getSnapchatAnalytics = async (req, res, next) => {
  const { organizationId, accessToken } = req.body;

  try {
    const url = `https://adsapi.snapchat.com/v1/organizations/${organizationId}/adsquads/stats`;

    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: {
        fields: "impressions,swipes,spend,conversions",
        granularity: "DAY",
        start_time: "2024-09-01",
        end_time: "2024-09-25"
      }
    });

    res.json({
      platform: "snapchat",
      data: response.data.data
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
