import bp from "body-parser";
import express from "express";
const app = express();
import db from "./db.js"
const urlp = bp.urlencoded({ extended: true });

app.get("/status", async (req, res) => {
  res.send('{"Kode":"01","pesan":"API ExpressJS OK"}');
});

app.listen(3478, () => {
  console.log("API Berjalan Di Port:" + 3478);
});

app.get("/lokasidana", async (req, res) => {
  const dt = await db.getLokasiDana();
  if (dt == false) {
    res.send('{"kode":"0","pesan":"Data lokasi dana tidak di temukan"}');
  } else {
    res.send(
      `{"kode":"1","pesan": "Data lokasi dana di temukan","data":${JSON.stringify(
        dt
      )}}`
    );
  }
});
app.post("/penjualan", urlp, async (req, res) => {
  let tgl1 = req.body.tgl_awal;
  let tgl2 = req.body.tgl_akhir;
  const dt = await db.getPenjualan(tgl1, tgl2);
  if (dt == false) {
    res.send('{"kode":"0","pesan":"Data Tidak Di Temukan"}');
  } else {
    let dtakhir = [];
    let jmldt = 0;
    for (x of dt) {
      jmldt++;
      let dtsub = [];
      let jenisBarang = 0;
      let jumlahBarang = 0;
      let total = 0;
      const dp = await db.getDetailPenjualan(x.id);
      for (y of dp) {
        jenisBarang++;
        jumlahBarang += y.jumlah;
        total += y.harga * y.jumlah;
        dtsub.push({
          "barang": y.nama,
          "harga_satuan": y.harga,
          "jumlah": y.jumlah,
          "satuan": y.satuan,
        });
      }
      dtakhir.push({
        "id_transaksi": x.id,
        "kepada": x.kepada,
        "alamat": x.alamat,
        "tgl_penjualan": x.tgl_jual,
        "jenis_barang": jenisBarang,
        "jumlah_barang": jumlahBarang,
        "total_harga": total,
        "detail": dtsub,
      });
    }
    res.send(
      `{"kode":"1",""pesan":"Data Penjualan Di Temukan", "jumlah_data":"${jmldt}", "data": "${JSON.stringify(dtakhir)}"}`
    );
  }
});
