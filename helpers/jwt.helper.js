import jwt from 'jsonwebtoken';

export function generateJWT({ id, username, role }) {
    return new Promise(async (resolveContent, reject) => {

        const data = {
            id, username, role
        };
        
        const secret = process.env.JWT_SECRET;

        const options = {
            algorithm: 'HS512',
            expiresIn: '2h',
            issuer: process.env.JWT_ISSUER,
            audience: process.env.JWT_AUDIENCE
        };

        jwt.sign(data, secret, options, (error, token) => {
            if (error) {
                reject(error);
                return;
            }

            resolveContent(token);
        });

    });
}

export function decodeJWT(token) {
    return new Promise(async (resolve, reject) => {
        
        const options = {
            issuer: process.env.JWT_ISSUER,
            audience: process.env.JWT_AUDIENCE
        };

        const secret = process.env.JWT_SECRET;

        jwt.verify(token, secret, options, (error, data) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(data);
        });

    });
}