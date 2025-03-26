import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { createUser, findUserByUsername } from '../models/userModel.js';
import { query as poolQuery } from '../config/db.js';

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

export const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userCheck = await poolQuery('SELECT username FROM users WHERE username = $1', [username]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await poolQuery(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
      [username, hashedPassword]
    );

    const token = generateToken(newUser.rows[0]);
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed', details: err.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userResult = await poolQuery(
      'SELECT id, username, password FROM users WHERE username = $1',
      [username]
    );

    if (userResult.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const user = userResult.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = generateToken({ id: user.id, username: user.username });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
};