const QRCode = require('qrcode')

const construireContenu = (token) => {
    const baseUrl = process.env.APP_URL || 'http://localhost:3000'
    return `${baseUrl}/admin/qr-verify/${token}`
}

const generer = async (token) => {
    const contenu = construireContenu(token)

    const imageBase64 = await QRCode.toDataURL(contenu, {
        width:            300,
        margin:           2,
        color: {
            dark:  '#000000',
            light: '#ffffff',
        },
    })

    return imageBase64
}

module.exports = { generer }