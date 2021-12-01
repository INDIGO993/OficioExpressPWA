if('serviceWorker'in navigator){
    navigator.serviceWorker.register('./serviceworker.js')
    .then(reg => console.log('Registro exitoso', reg))
    .catch(err =>console.warn('Error en el registro',err))
}