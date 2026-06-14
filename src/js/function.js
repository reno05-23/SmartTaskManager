console.log("FUNCTION.JS BERHASIL DIMUAT");

var db;

export function konfigurasidb() {

    console.log("konfigurasidb DIPANGGIL");

    var request = indexedDB.open("db_task_manager", 1);

    request.onerror = function (event) {
        console.log("ERROR DATABASE", event);
    };

    request.onsuccess = function (event) {
        db = event.target.result;
        console.log("DATABASE BERHASIL DIBUKA");
    };

    request.onupgradeneeded = function (event) {
        console.log("MEMBUAT DATABASE BARU");

        db = event.target.result;

        var objectStore = db.createObjectStore("tabel_tugas", {
            keyPath: "id",
            autoIncrement: true
        });

        objectStore.createIndex("judul_tugas", "judul_tugas", { unique: false });
        objectStore.createIndex("tgl_deadline", "tgl_deadline", { unique: false });
        objectStore.createIndex("kategori", "kategori", { unique: false });
        objectStore.createIndex("status_selesai", "status_selesai", { unique: false });
        objectStore.createIndex("catatan", "catatan", { unique: false });

        console.log("OBJECT STORE BERHASIL DIBUAT");
    };

}
export function tambahtugas(judul_tugas, tgl_deadline, kategori, status_selesai, catatan) {

    var transaksi = db.transaction(["tabel_tugas"], "readwrite");

    var objectStore = transaksi.objectStore("tabel_tugas");

    var data = {
        judul_tugas: judul_tugas,
        tgl_deadline: tgl_deadline,
        kategori: kategori,
        status_selesai: status_selesai,
        catatan: catatan
    };

    var request = objectStore.add(data);

    request.onsuccess = function () {
        console.log("Data berhasil disimpan");
    };

    request.onerror = function () {
        console.log("Data gagal disimpan");
    };

}
export function bacatugas(callback) {

    var transaksi = db.transaction(["tabel_tugas"], "readonly");

    var objectStore = transaksi.objectStore("tabel_tugas");

    var request = objectStore.getAll();

    request.onsuccess = function () {

        callback(request.result);

    };

    request.onerror = function () {

        console.log("Gagal membaca data");

    };

}
export function ambilsatutugas(id, callback) {

    var transaksi = db.transaction(["tabel_tugas"], "readonly");

    var objectStore = transaksi.objectStore("tabel_tugas");

    var request = objectStore.get(id);

    request.onsuccess = function () {

        callback(request.result);

    };

    request.onerror = function () {

        console.log("Gagal mengambil data");

    };

}
export function updatetugas(id, judul_tugas, tgl_deadline, kategori, status_selesai, catatan) {

    var transaksi = db.transaction(["tabel_tugas"], "readwrite");

    var objectStore = transaksi.objectStore("tabel_tugas");

    var data = {

        id: id,

        judul_tugas: judul_tugas,

        tgl_deadline: tgl_deadline,

        kategori: kategori,

        status_selesai: status_selesai,

        catatan: catatan

    };

    var request = objectStore.put(data);

    request.onsuccess = function () {

        console.log("Data berhasil diupdate");

    };

    request.onerror = function () {

        console.log("Gagal update");

    };

}
export function hapustugas(id) {

    var transaksi = db.transaction(["tabel_tugas"], "readwrite");

    var objectStore = transaksi.objectStore("tabel_tugas");

    var request = objectStore.delete(id);

    request.onsuccess = function () {

        console.log("Data berhasil dihapus");

    };

    request.onerror = function () {

        console.log("Gagal menghapus data");

    };

}