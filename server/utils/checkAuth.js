import jwt from "jsonwebtoken";

export const cheskAuth = (req, res, next) => {
    // Дістали токен
    const token = (req.headers.authorization || '').replace('/Bearer\s?/', '')
    if (token) {
        try {
            const decoded = jwt.verify(token, 'ofghjiDFJBNuigjiopdfk9082348hgfjDFDirkd9o3');
            
            req.userId = decoded.id;

            next();
        } catch (e) {
            return res.json({
                message: 'You dont have access'
            })
        }

    } else {
        return res.json({
            message: 'You dont have access'
        })
    }
}