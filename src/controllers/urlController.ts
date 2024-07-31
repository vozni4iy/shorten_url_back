import { Request, Response } from 'express';
import { AppDataSource } from '../data-source.js';
import { Url } from '../entity/Url.js';
import { generateShortCode } from '../utils/generateShortCode.js';
import { isValidUrl } from '../utils/isValidUrl.js';

export const shortenUrl = async (req: Request, res: Response) => {
  try {
    const { originalUrl } = req.body;

    if (!isValidUrl(originalUrl)) {
      return res.status(400).json({ error: 'Invalid URL format' });
    }

    const urlRepository = AppDataSource.getRepository(Url);
    let url = await urlRepository.findOne({ where: { originalUrl } });

    if (url) {
      return res.json({ shortCode: url.shortCode });
    }

    const shortCode = generateShortCode();
    url = new Url();
    url.originalUrl = originalUrl;
    url.shortCode = shortCode;

    await urlRepository.save(url);
    res.json({ shortCode });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while shortening the URL' });
  }
};

export const redirectUrl = async (req: Request, res: Response) => {
  try {
    const { shortCode } = req.params;
    const urlRepository = AppDataSource.getRepository(Url);

    const url = await urlRepository.findOne({ where: { shortCode } });

    if (url) {
      res.redirect(url.originalUrl);
    } else {
      res.status(404).send('URL not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while redirecting the URL');
  }
};
