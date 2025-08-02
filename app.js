const express = require('express');
//require('dotenv').config();
const mysql = require('mysql2');


const client = mysql.createConnection({
    host: process.env.BD_HOST,
    port: process.env.BD_PORT,
    user: process.env.BD_USER,
    password: process.env.BD_PASSWORD,
    database: process.env.BD_NAME
});

const app = express()


const EXPRESS_PORT = process.env.EXPRESS_PORT || 3000;


app.listen(EXPRESS_PORT, (error)=>{

    if(error) throw error;

    console.log("Se ha lanzado express desde: ", "http://localhost:",EXPRESS_PORT)

})


async function cargarClientesDesdeCSV2() {
  return new Promise((resolve, reject) => {

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

main()

document.getElementById('formLoadCsvs').addEventListener("submit",async(e)=> {

    e.preventDefault()


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

})