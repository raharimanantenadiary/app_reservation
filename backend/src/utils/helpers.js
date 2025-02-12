// backend/src/utils/helpers.js

const jourSemaineVersTexte = (numero) => {
    const jours = {
        0: 'lundi',
        1: 'mardi',
        2: 'mercredi',
        3: 'jeudi',
        4: 'vendredi',
        5: 'samedi',
        6: 'dimanche',
    }
    return jours[numero] || 'inconnu'
}

const formaterDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
        day:   '2-digit',
        month: '2-digit',
        year:  'numeric',
    })
}

const formaterHeure = (heure) => {
    return heure.slice(0, 5)
}

const calculerPlacesRestantes = (capaciteMax, totalReserve) => {
    return capaciteMax - totalReserve
}

const estDatePassee = (date) => {
    const aujourdhui    = new Date()
    const dateVerifier  = new Date(date)
    aujourdhui.setHours(0, 0, 0, 0)
    dateVerifier.setHours(0, 0, 0, 0)
    return dateVerifier < aujourdhui
}

module.exports = {
    jourSemaineVersTexte,
    formaterDate,
    formaterHeure,
    calculerPlacesRestantes,
    estDatePassee,
}