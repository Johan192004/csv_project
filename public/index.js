const Papa = require('papaparse');


async function cargarMedicamentosDesdeCSV() {
  return new Promise((resolve, reject) => {
    const medicamentos = [];
    fs.createReadStream('medicamentos_far.csv')
      .pipe(csv({
        mapHeaders: ({ header }) => header.trim()
      }))
      .on('data', (data) => {
        medicamentos.push(data);
      })
      .on('end', async () => {
        try {
        for (const item of medicamentos) {
          const query = `
            INSERT INTO medicamentos (id,medicamento,precio_unitario,id_categoria)
            VALUES ($1,$2,$3,$4)
            ON CONFLICT (id) DO NOTHING;
          `;
          const values = [
            parseInt(item.id),
            item.medicamento,
            parseInt(item.precio_unitario),
            parseInt(item.id_categoria)
          ];
          await client.query(query, values);
        }
        resolve()
        } catch (error) {
          reject(error)
        }

        console.log(' Usuarios cargados exitosamente.');
      }).on('error',reject);

  
  })
}

async function cargarEstadosDesdeCSV() {
  return new Promise((resolve, reject) => {
    const estados = [];

    fs.createReadStream('estados_de_pago_far.csv')
      .pipe(csv({
        mapHeaders: ({ header }) => header.trim()
      }))
      .on('data', (data) => {
        estados.push(data);
      })
      .on('end', async () => {
        try {
          for (const item of estados) {
            const query = `
              INSERT INTO estados (id, estado)
              VALUES ($1, $2)
              ON CONFLICT (id) DO NOTHING;
            `;
            const values = [
              parseInt(item.id),
              item.estado
            ];
            await client.query(query, values);
          }
          console.log('Estados cargados exitosamente.');
          resolve(); // ✅ Resolvemos la Promise cuando termina
        } catch (err) {
          reject(err); // ⛔ Si algo falla, se rechaza la Promise
        }
      })
      .on('error', reject); // Captura errores en el stream
  });
}



async function cargarCategoriasDesdeCSV() {
  return new Promise((resolve, reject) => {
    const categorias = [];

    fs.createReadStream('categorias_far.csv')
      .pipe(csv({
        mapHeaders: ({ header }) => header.trim()
      }))
      .on('data', (data) => {
        categorias.push(data);
      })
      .on('end', async () => {
        try {
          for (const item of categorias) {
            const query = `
              INSERT INTO categorias (id, categoria)
              VALUES ($1, $2)
              ON CONFLICT (id) DO NOTHING;
            `;
            
            const values = [
              parseInt(item['id']),
              item.categoria
            ];
            console.log(typeof item)
            await client.query(query, values);
          }

          console.log('Categorías cargadas exitosamente.');
          resolve(); // ✅ Marca la función como completada exitosamente
        } catch (err) {
          reject(err); // ⛔ Captura errores durante las queries
        }
      })
      .on('error', reject); // ⛔ Captura errores de lectura del archivo
  });
}


async function cargarMetodosPagoDesdeCSV() {
  return new Promise((resolve, reject) => {
    const metodos = [];

    fs.createReadStream('metodos_de_pago_far.csv')
      .pipe(csv({
        mapHeaders: ({ header }) => header.trim()
      }))
      .on('data', (data) => {
        metodos.push(data);
      })
      .on('end', async () => {
        try {
          for (const item of metodos) {
            const query = `
              INSERT INTO metodos_pagos (id, metodo_pago)
              VALUES ($1, $2)
              ON CONFLICT (id) DO NOTHING;
            `;
            console.log(item)
            console.log(item['id'])
            const values = [
              parseInt(item.id),
              item.metodo_pago
            ];
            await client.query(query, values);
          }
          console.log('Métodos de pago cargados exitosamente.');
          resolve();
        } catch (err) {
          reject(err);
        }
      })
      .on('error', reject);
  });
}



async function cargarClientesDesdeCSV() {
  return new Promise((resolve, reject) => {
    const clientes = [];

    fs.createReadStream('clientes_far.csv')
      .pipe(csv({
        mapHeaders: ({ header }) => header.trim()
      }))
      .on('data', (data) => {
        clientes.push(data);
      })
      .on('end', async () => {
        try {
          for (const item of clientes) {
            const query = `
              INSERT INTO clientes (id, nombre, email, telefono)
              VALUES ($1, $2, $3, $4)
              ON CONFLICT (id) DO NOTHING;
            `;
            const values = [
              parseInt(item.id),
              item.nombre,
              item.email,
              parseInt(item.telefono)
            ];
            await client.query(query, values);
          }
          console.log('Clientes cargados exitosamente.');
          resolve();
        } catch (err) {
          reject(err);
        }
      })
      .on('error', reject);
  });
}


async function cargarFacturasDesdeCSV() {
  return new Promise((resolve, reject) => {
    const facturas = [];

    fs.createReadStream('examinar.csv')
      .pipe(csv({
        mapHeaders: ({ header }) => header.trim()
      }))
      .on('data', (data) => {
        facturas.push(data);
      })
      .on('end', async () => {
        try {
          for (const item of facturas) {
            const query = `
              INSERT INTO facturas (id)
              VALUES ($1)
              ON CONFLICT (id) DO NOTHING;
            `;
            const values = [item.id];
            await client.query(query, values);
          }
          console.log('Facturas cargadas exitosamente.');
          resolve();
        } catch (err) {
          reject(err);
        }
      })
      .on('error', reject);
  });
}




async function cargarDetalleFacturasDesdeCSV() {
  return new Promise((resolve, reject) => {
    const detalles = [];

    fs.createReadStream('detalles_factura_far.csv')
      .pipe(csv({
        mapHeaders: ({ header }) => header.trim()
      }))
      .on('data', (data) => {
        detalles.push(data);
      })
      .on('end', async () => {
        try {
          for (const item of detalles) {
            const query = `
              INSERT INTO detalle_facturas (id, fecha, cantidad, id_cliente, id_medicamento, id_estado, id_metodo_pago)
              VALUES ($1, $2, $3, $4, $5, $6, $7)
              ON CONFLICT (id) DO NOTHING;
            `;
            const values = [
              parseInt(item.id),
              item.fecha,
              parseInt(item.cantidad),
              parseInt(item.id_cliente),
              parseInt(item.id_medicamento),
              parseInt(item.id_estado),
              parseInt(item.id_metodo_pago),
            ];
            await client.query(query, values);
          }
          console.log('Detalle de facturas cargados exitosamente.');
          resolve();
        } catch (err) {
          reject(err);
        }
      })
      .on('error', reject);
  });
}


/*<input type="file" id="csvInput" accept=".csv">
<script src="https://cdn.jsdelivr.net/npm/papaparse@5.3.2/papaparse.min.js"></script>
 */

document.getElementById('csvInput').addEventListener('change', function(event) {
    const file = event.target.files[0];

    Papa.parse(file, {
        header: true,              // convierte cada fila en un objeto
        skipEmptyLines: true,     // ignora filas vacías
        dynamicTyping: true,      // convierte automáticamente números y booleanos
        complete: function(result) {
        console.log("Datos procesados:", result.data); // array de objetos
        console.log("Errores:", result.errors);
        }
    });
});


async function cargarClientesDesdeCSV2() {
  return new Promise((resolve, reject) => {
    const clientes = [];

    let uploaded_file;
    try{
        uploaded_file= document.getElementById('csvClientes').files[0];
    } catch (error) {
        console.log(`Error al cargar un CSV`, error)
        reject(error)
    }

    Papa.parse(uploaded_file, {
    header: true,              // convierte cada fila en un objeto
    skipEmptyLines: true,     // ignora filas vacías
    dynamicTyping: true,      // convierte automáticamente números y booleanos
    complete: async function(result) {
        try {
            for (const item of result.data) {
                const query = `
                INSERT INTO clientes (id, nombre, email, telefono)
                VALUES ($1, $2, $3, $4)
                ON CONFLICT (id) DO NOTHING;
                `;
                const values = [
                parseInt(item.id),
                item.nombre,
                item.email,
                parseInt(item.telefono)
                ];
                await client.query(query, values);
            }
            console.log('Clientes cargados exitosamente.');
            resolve();
            } catch (err) {
            reject(err);
            }
        }
    });
    




  });
}

async function cargarDetalleFacturasDesdeCSV2() {
  return new Promise((resolve, reject) => {
    let uploaded_file;
    try {
      uploaded_file = document.getElementById('csvDetalleFacturas').files[0];
    } catch (error) {
      console.log('Error al acceder al archivo CSV:', error);
      return reject(error);
    }

    Papa.parse(uploaded_file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: async function(result) {
        try {
          for (const item of result.data) {
            const query = `
              INSERT INTO detalle_facturas (id, fecha, cantidad, id_cliente, id_medicamento, id_estado, id_metodo_pago)
              VALUES ($1, $2, $3, $4, $5, $6, $7)
              ON CONFLICT (id) DO NOTHING;
            `;
            const values = [
              parseInt(item.id),
              item.fecha,
              parseInt(item.cantidad),
              parseInt(item.id_cliente),
              parseInt(item.id_medicamento),
              parseInt(item.id_estado),
              parseInt(item.id_metodo_pago),
            ];
            await client.query(query, values);
          }
          console.log('Detalle de facturas cargado exitosamente.');
          resolve();
        } catch (err) {
          console.error('Error al insertar en la base de datos:', err);
          reject(err);
        }
      },
      error: function(err) {
        console.error('Error al parsear el CSV:', err);
        reject(err);
      }
    });
  });
}

async function cargarFacturasDesdeCSV2() {
  return new Promise((resolve, reject) => {
    let uploaded_file;
    try {
      uploaded_file = document.getElementById('csvFacturas').files[0];
    } catch (error) {
      console.error('Error al acceder al archivo CSV:', error);
      return reject(error);
    }

    Papa.parse(uploaded_file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: async function(result) {
        try {
          for (const item of result.data) {
            const query = `
              INSERT INTO facturas (id)
              VALUES ($1)
              ON CONFLICT (id) DO NOTHING;
            `;
            const values = [parseInt(item.id)];
            await client.query(query, values);
          }
          console.log('Facturas cargadas exitosamente.');
          resolve();
        } catch (err) {
          console.error('Error al insertar facturas en la base de datos:', err);
          reject(err);
        }
      },
      error: function(err) {
        console.error('Error al parsear el archivo CSV:', err);
        reject(err);
      }
    });
  });
}

async function cargarMetodosPagoDesdeCSV2() {
  return new Promise((resolve, reject) => {
    let uploaded_file;
    try {
      uploaded_file = document.getElementById('csvMetodosPago').files[0];
    } catch (error) {
      console.error('Error al acceder al archivo CSV:', error);
      return reject(error);
    }

    Papa.parse(uploaded_file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: async function(result) {
        try {
          for (const item of result.data) {
            const query = `
              INSERT INTO metodos_pagos (id, metodo_pago)
              VALUES ($1, $2)
              ON CONFLICT (id) DO NOTHING;
            `;
            const values = [
              parseInt(item.id),
              item.metodo_pago
            ];
            await client.query(query, values);
          }
          console.log('Métodos de pago cargados exitosamente.');
          resolve();
        } catch (err) {
          console.error('Error al insertar en la base de datos:', err);
          reject(err);
        }
      },
      error: function(err) {
        console.error('Error al parsear el archivo CSV:', err);
        reject(err);
      }
    });
  });
}

async function cargarCategoriasDesdeCSV2() {
  return new Promise((resolve, reject) => {
    let uploaded_file;
    try {
      uploaded_file = document.getElementById('csvCategorias').files[0];
    } catch (error) {
      console.error('Error al acceder al archivo CSV:', error);
      return reject(error);
    }

    Papa.parse(uploaded_file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: async function(result) {
        try {
          for (const item of result.data) {
            const query = `
              INSERT INTO categorias (id, categoria)
              VALUES ($1, $2)
              ON CONFLICT (id) DO NOTHING;
            `;
            const values = [
              parseInt(item.id),
              item.categoria
            ];
            await client.query(query, values);
          }

          console.log('Categorías cargadas exitosamente.');
          resolve();
        } catch (err) {
          console.error('Error al insertar categorías:', err);
          reject(err);
        }
      },
      error: function(err) {
        console.error('Error al parsear el archivo CSV:', err);
        reject(err);
      }
    });
  });
}

async function cargarEstadosDesdeCSV2() {
  return new Promise((resolve, reject) => {
    let uploaded_file;
    try {
      uploaded_file = document.getElementById('csvEstados').files[0];
    } catch (error) {
      console.error('Error al acceder al archivo CSV:', error);
      return reject(error);
    }

    Papa.parse(uploaded_file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: async function(result) {
        try {
          for (const item of result.data) {
            const query = `
              INSERT INTO estados (id, estado)
              VALUES ($1, $2)
              ON CONFLICT (id) DO NOTHING;
            `;
            const values = [
              parseInt(item.id),
              item.estado
            ];
            await client.query(query, values);
          }
          console.log('Estados cargados exitosamente.');
          resolve();
        } catch (err) {
          console.error('Error al insertar estados:', err);
          reject(err);
        }
      },
      error: function(err) {
        console.error('Error al parsear el archivo CSV:', err);
        reject(err);
      }
    });
  });
}

async function cargarMedicamentosDesdeCSV2() {
  return new Promise((resolve, reject) => {
    let uploaded_file;
    try {
      uploaded_file = document.getElementById('csvMedicamentos').files[0];
    } catch (error) {
      console.error('Error al acceder al archivo CSV:', error);
      return reject(error);
    }

    Papa.parse(uploaded_file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: async function(result) {
        try {
          for (const item of result.data) {
            const query = `
              INSERT INTO medicamentos (id, medicamento, precio_unitario, id_categoria)
              VALUES ($1, $2, $3, $4)
              ON CONFLICT (id) DO NOTHING;
            `;
            const values = [
              parseInt(item.id),
              item.medicamento,
              parseInt(item.precio_unitario),
              parseInt(item.id_categoria)
            ];
            await client.query(query, values);
          }

          console.log('Medicamentos cargados exitosamente.');
          resolve();
        } catch (error) {
          console.error('Error al insertar medicamentos:', error);
          reject(error);
        }
      },
      error: function(err) {
        console.error('Error al parsear el archivo CSV:', err);
        reject(err);
      }
    });
  });
}

async function main() {
  try {
    await client.connect();

    await cargarMetodosPagoDesdeCSV2();
    console.log("1");
    
    await cargarCategoriasDesdeCSV2();
    console.log("2");
    await cargarEstadosDesdeCSV2();
    console.log("3");

    await cargarClientesDesdeCSV2();
    console.log("4");

    await cargarFacturasDesdeCSV2();
    console.log("5");

    await cargarMedicamentosDesdeCSV2();
    console.log("6");

    await cargarDetalleFacturasDesdeCSV2();
    console.log("7");


    await client.end();
    console.log('✅ Todos los datos fueron cargados con éxito.');
  } catch (error) {
    console.error('❌ Error general:', error);
    await client.end();
  }
}
