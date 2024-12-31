
import mysql from "mysql2/promise"


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
const formPemjualan = async ()=>{
    const db = await koneksi();
    sql = "SELECT form.id, form.nama, menu.icon, menu.status, menu.urut FROM form INNER JOIN menu  ON form.id_menu=menu.id";
    const [rows] = await db.execute(sql);
    return rows.length > 0 ? rows : false;
}
const ambilKoreksiStok = async ()=>{
    const db = await koneksi();
    sql = "SELECT koreksi_stok.id, barang.nama,koreksi_stok.jenis, koreksi_stok.satuan, koreksi_stok.jumlah, koreksi_stok.alasan FROM koreksi_stok INNER JOIN barang  ON koreksi_stok.id_barang=barang.id";
    const [rows] = await db.execute(sql);
    return rows.length > 0 ? rows : false;
}
export default {koneksi, getLokasiDana, getPenjualan, getDetailPenjualan, formPemjualan, ambilKoreksiStok};