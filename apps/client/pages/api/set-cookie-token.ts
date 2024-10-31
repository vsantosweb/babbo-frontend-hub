// pages/api/set-cookie.js
import { serialize } from 'cookie';

export default function handler(req, res) {
  const { name, value } = req.body;

  res.setHeader('Set-Cookie', serialize(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 1 semana
    path: '/',
  }));

  res.status(200).json({ message: 'Cookie set!' });
}
