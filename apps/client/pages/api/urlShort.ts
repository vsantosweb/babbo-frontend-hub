// pages/api/shortener.js

// const urlStore = {};

// export default function handler(req, res) {
//     if (req.method === 'GET') {
//         const { longURL } = req.body;
//         const shortID = generateShortID();
//         urlStore[shortID] = longURL;
//         const shortURL = `https://yourwebsite.com/${shortID}`;
//         res.status(200).json({ shortURL });
//     } else if (req.method === 'GET') {
//         const { shortID } = req.query;
//         const originalURL = urlStore[shortID];
//         if (originalURL) {
//             res.redirect(originalURL);
//         } else {
//             res.status(404).send('URL not found');
//         }
//     }
// }

// function generateShortID() {
//     return Math.random().toString(36).substr(2, 8);
// }
