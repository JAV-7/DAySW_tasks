const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // 1. Get token from header
  const authHeader = req.headers['authorization'];
  
  // 2. Check if token exists
  if (!authHeader) {
    return res.status(401).json({ 
      success: false,
      message: 'Authorization header is required'
    });
  }

  // 3. Extract token (Bearer <token>)
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ 
      success: false,
      message: 'Bearer token is required'
    });
  }

  // 4. Verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      let message = 'Invalid token';
      
      // More specific error messages
      if (err.name === 'TokenExpiredError') {
        message = 'Token has expired';
      } else if (err.name === 'JsonWebTokenError') {
        message = 'Malformed token';
      }
      
      return res.status(403).json({ 
        success: false,
        message
      });
    }

    // 5. Attach decoded user to request
    req.user = {
      id: decoded.id,       // Standardized property names
      role: decoded.role    // Always use consistent naming
    };
    
    next();
  });
};

module.exports = { verifyToken };