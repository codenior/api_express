const mysql = require("mysql2/promise");


let sql;
const koneksi = async () => {
    return await mysql.createConnection({
        host:'localhost',
        user:'root',
        password: '',
        database: 'api-lav'
    })
}

const getLokasiDana = async () => {
    const db = await koneksi();
    sql = "SELECT * FROM lokasi_dana";
    const [rows] = await db.execute(sql);
    return rows.length > 0 ? rows : false;
}

const getPenjualan = async (tgl1, tgl2) =>{
    const db = await koneksi();
    let awal = `${tgl1} 00:00:01`;
    let akhir = `${tgl2} 23:59:59`;
    sql = `SELECT * FROM penjualan WHERE tgl_jual BETWEEN '${awal}' AND '${akhir}' `;
    const [rows] = await db.execute(sql);
    return rows.length > 0 ? rows : false;
}
const getDetailPenjualan = async (idtransaksi) => {
    const db = await koneksi();
    sql = `SELECT * FROM penjualan_detail WHERE id_penjualan = '${idtransaksi}'`;
    const [rows] = await db.execute(sql);
    return rows.length > 0 ? rows : false;
}
module.exports= {koneksi, getLokasiDana, getPenjualan, getDetailPenjualan};