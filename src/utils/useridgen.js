import crypto from 'crypto';

export const generateUserId = () => {
    return crypto.randomBytes(16).toString("hex");
}