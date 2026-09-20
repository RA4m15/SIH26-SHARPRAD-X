import { Response, NextFunction } from 'express';
import { UserRole, AuthenticatedRequest } from '../types';

export function requireRole(...roles: UserRole[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Unauthenticated' });
      return;
    }
    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        error: `Access denied. Required role: ${roles.join(' or ')}`,
      });
      return;
    }
    next();
  };
}

// Shorthand guards
export const ministryOnly = requireRole('ministry_officer');
export const providerOnly = requireRole('provider');
export const anyRole = requireRole('ministry_officer', 'provider');
