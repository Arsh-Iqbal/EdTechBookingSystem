const jwt = require('jsonwebtoken');
const db = require('../db');

exports.protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token && token.startsWith('Bearer ')) {
      token = token.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ error: 'Not authorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userData = await db.collection('users').doc(decoded.id).get();

    if (!userData.exists) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token verification failed' });
  }
};
