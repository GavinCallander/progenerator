import path from 'path';
import { promises as fs } from 'fs';

// from vercel docs, with some alterations
export default async function handler(req, res) {
    // find the absolute path of the json directory
    const jsonDir = path.join(process.cwd(), 'json');
    // read the json data file data.json
    const fileContents = await fs.readFile(jsonDir + '/projects.json', 'utf8');
    // return the content of the data file in json format
    console.log(fileContents);
    res.status(200).send(fileContents);
};