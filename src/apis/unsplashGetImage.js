// find URL for background image with splash API
import axios from 'axios';
import { findBackground } from '../helpers/helperFuncs';
require('dotenv').config();

const KEY = process.env.REACT_APP_UNSPLASH_KEY;

const getImg = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: KEY,
  },
});

const getBackgroundImg = async (temperature, apiID, additionalDescription) => {
  // find a query word for searching for background
  if (temperature && apiID) {
    const backgroundImgDescription = findBackground(
      temperature,
      apiID,
      additionalDescription
    );

    //search for the background image
    try {
      const unsplashResponse = await getImg.get('/search/photos', {
        params: {
          query: backgroundImgDescription,
        },
      });

      // generate a random number to choose a background image
      const randomImage = Math.floor(Math.random() * 10);

      if (unsplashResponse.data.results.length) {
        return {
          backgroundImg:
            unsplashResponse.data.results[randomImage].urls.regular,
        };
      }
      return { backgroundImg: '' };
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  }
};

export { getBackgroundImg };
