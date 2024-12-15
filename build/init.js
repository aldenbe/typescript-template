import * as fs from 'fs';
import { dist } from './config.js';

// ensure dist exist
if (!fs.existsSync(dist)) {
  fs.mkdirSync(dist);
}
