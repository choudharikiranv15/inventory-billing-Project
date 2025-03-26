import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  try {
    // 1. Extract token
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        error: 'Authorization header missing',
        solution: 'Format: "Bearer <token>"',
      });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        error: 'Token not found in header',
        solution: 'Ensure format is "Bearer <token>"',
      });
    }

    // 2. Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error('JWT Verification Error:', err.message);

        if (err.name === 'TokenExpiredError') {
          return res.status(403).json({
            error: 'Token expired',
            solution: 'Re-login to get new token',
          });
        }

        return res.status(403).json({
          error: 'Invalid token',
          details: err.message,
        });
      }

      // 3. Attach user data to request
      req.user = decoded;
      console.log('Authenticated user:', decoded); // Debug log
      next();
    });
  } catch (err) {
    console.error('Auth Middleware Error:', err);
    res.status(500).json({
      error: 'Authentication processing failed',
      details: err.message,
    });
  }
};

export const checkTokenExpiry = (req, res, next) => {
  if (req.user.exp < Date.now() / 1000) {
    return res.status(401).json({
      error: 'Token expired',
      solution: '/api/auth/refresh-token',
    });
  }
  next();
};