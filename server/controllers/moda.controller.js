import Moda from '../models/moda';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all modas
 * @param req
 * @param res
 * @returns void
 */
export function getModas(req, res) {
  Moda.find().sort('-dateAdded').exec((err, modas) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ modas });
  });
}

/**
 * Save a moda
 * @param req
 * @param res
 * @returns void
 */
export function addModa(req, res) {
  //if (!req.body.moda.userCase || !req.body.moda.accessConditions) {
  //  return res.status(403).end();
  //}

  const newModa = new Moda(req.body.moda);

  // Let's sanitize inputs
  newModa.userCase = sanitizeHtml(newModa.userCase);

  newModa.slug = slug(newModa.userCase.toLowerCase(), { lowercase: true });
  newModa.cuid = cuid();
  newModa.save((err, saved) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.json({ moda: saved });
  });
}

/**
 * Update a moda
 * @param req
 * @param res
 * @returns void
 */
export function putModa(req, res) {
  //if (!req.body.moda.userCase || !req.body.moda.accessConditions) {
  //  return res.status(403).end();
  //}

  Moda.update({ cuid: req.body.moda.cuid}, req.body.moda, (err, raw) => {
      if (err) {
        res.status(500).send(err);
      }
      console.log('The raw response from Mongo was ', raw);
    });
  //res.json({ req.body.moda });
  //return res.status(200).end();
}

/**
 * Get a single moda
 * @param req
 * @param res
 * @returns void
 */
export function getModa(req, res) {
  Moda.findOne({ cuid: req.params.cuid }).exec((err, moda) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ moda });
  });
}

/**
 * Delete a moda
 * @param req
 * @param res
 * @returns void
 */
export function deleteModa(req, res) {
  Moda.findOne({ cuid: req.params.cuid }).exec((err, moda) => {
    if (err) {
      res.status(500).send(err);
    }

    moda.remove(() => {
      res.status(200).end();
    });
  });
}
