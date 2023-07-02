import jwt from 'jsonwebtoken'

const generateToken = (res, userId) => {
    const token = jwt.sign({userId}, process.env.SECRET, {
        expiresIn: '3d'
    })

    res.cookie('jwtToken', token, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 3 * 24 * 60 * 60 * 1000
    })
}

export default generateToken