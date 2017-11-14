import { Router } from 'express';
import request from 'request-promise';
import dotenv from 'dotenv';

dotenv.config({ path: `${__dirname}./env` });

const riotAPIKey = process.env.RIOT_KEY;
const router = Router();

export default () => {
  router.get('/', (req, res) => {
    res.json({ message: 'Hit api' });
  });

  router.get('/summoner', (req, res) => {
    const summoner = req.query.summoner;
    request.get(`https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${summoner}?api_key=${riotAPIKey}`).then((result) => {
      console.log(result);
      res.json(result);
    }).catch((err) => {
      console.log(err);
    });
  });

  router.get('/matches', (req, res) => {
    const accountId = req.query.accountId;
    request.get(`https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/${accountId}?api_key=${riotAPIKey}`).then((result) => {
      console.log(result);
      res.json(result);
    }).catch((err) => {
      console.log(err);
    });
  });

  router.get('/matchDetails', (req, res) => {
    const gameId = req.query.gameId;
    request.get(`https://na1.api.riotgames.com/lol/match/v3/matches/${gameId}?api_key=${riotAPIKey}`).then((result) => {
      console.log(result);
      res.json(result);
    }).catch((err) => {
      console.log(err);
    });
  });

  router.get('/champion', (req, res) => {
    const championId = req.query.championId;
    request.get(`https://na1.api.riotgames.com/lol/static-data/v3/champions/${championId}?locale=en_US&api_key=${riotAPIKey}`).then((result) => {
      console.log(result);
      res.json(result);
    }).catch((err) => {
      console.log(err);
    });
  });

  router.get('/item', (req, res) => {
    const itemId = req.query.itemId;
    request.get(`https://na1.api.riotgames.com/lol/static-data/v3/items/${itemId}?locale=en_US&api_key=${riotAPIKey}`).then((result) => {
      console.log(result);
      res.json(result);
    }).catch((err) => {
      console.log(err);
    });
  });

  router.get('/spells', (req, res) => {
    const spellId = req.query.spellId;
    request.get(`https://na1.api.riotgames.com/lol/static-data/v3/summoner-spells/${spellId}?locale=en_US&api_key=${riotAPIKey}`).then((result) => {
      console.log(result);
      res.json(result);
    }).catch((err) => {
      console.log(err);
    });
  });

  return router;
};
