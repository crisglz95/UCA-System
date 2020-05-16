//Puerto
process.env.PORT = process.env.PORT || 3000;

//Vencimiento del token
//60 seg * 60 min * 24 hrs
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//SEED
process.env.SEED = process.env.SEED || 'secret';