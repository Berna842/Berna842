const fs = require('fs');

const crearArchivo = async( base ) => {
  try {
    console.clear();
    let salida ='';
    console.log('================');
    console.log(`Tabla del ${base}`);
    console.log('================');

    for (var i = 1; i < 11; i++) {
      salida += `${base} X ${i} = ${base*i}\n`;
    }

    console.log(salida);

    fs.writeFileSync(`tabla-${base}.txt`, salida);

    return(`tabla-${base}.txt`);
  } catch (err) {
    throw err;
  }
}

module.exports = {
  crearArchivo
}
