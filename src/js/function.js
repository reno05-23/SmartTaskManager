// console.log("FUNCTION.JS BERHASIL DIMUAT");

// iki ngwe or mbaca index db
// var db;

// Promise yang resolve ketika db sudah siap dipakai
// var dbReadyPromise = new Promise((resolve, reject) => {
//     console.log("konfigurasidb DIPANGGIL");
//     var request = indexedDB.open("db_task_manager", 1);

//     request.onerror = function (event) {
//         console.log("ERROR DATABASE", event);
//         reject(event);
//     };

//     request.onsuccess = function (event) {
//         db = event.target.result;
//         console.log("DATABASE BERHASIL DIBUKA");
//         resolve(db);
//     };

//     request.onupgradeneeded = function (event) {
//         console.log("MEMBUAT DATABASE BARU");
//         db = event.target.result;
//         var objectStore = db.createObjectStore("tabel_tugas", {
//             keyPath: "id",
//             autoIncrement: true
//         });
//         objectStore.createIndex("judul_tugas", "judul_tugas", { unique: false });
//         objectStore.createIndex("tgl_deadline", "tgl_deadline", { unique: false });
//         objectStore.createIndex("kategori", "kategori", { unique: false });
//         objectStore.createIndex("status_selesai", "status_selesai", { unique: false });
//         objectStore.createIndex("catatan", "catatan", { unique: false });
//         console.log("OBJECT STORE BERHASIL DIBUAT");
//     };
// });

// // dipanggil dari app.js, tinggal return promise-nya
// export function konfigurasidb() {
//     return dbReadyPromise;
// }

export function konfigurasidb(){
    if(window.indexedDB){
        let request = window.indexedDB.open("db_task_manager", 1);

        request.onupgradeneeded = function(e){
            db = e.target.result;
            if(!db.objectStoreNames.contains("tabel_tugas")){
                let tbl = db.createObjectStore("tabel_tugas", {keyPath: 'id', autoIncrement: true});
                tbl.createIndex("judul_tugas", "judul_tugas", {unique: false});
                tbl.createIndex("tgl_deadline", "tgl_deadline", {unique: false});
                tbl.createIndex("kategori", "kategori", {unique: false});
                tbl.createIndex("status_selesai", "status_selesai", {unique: false});
                tbl.createIndex("catatan", "catatan", {unique: false});
                console.log("Object store 'tabel_tugas' berhasil dibuat");
            }
        };
        request.onerror = event =>{
            append.dialog.alert(`Database error: ${event.target.errorCode}`, "Error");
        };
        request.onsuccess = event =>{
            db = event.target.result;
            console.log("Database berhasil dibuka");
        }
    }
}






// nambah tugas
// export async function tambahtugas(judul_tugas, tgl_deadline, kategori, status_selesai, catatan) {
//     await dbReadyPromise;
//     var transaksi = db.transaction(["tabel_tugas"], "readwrite");
//     var objectStore = transaksi.objectStore("tabel_tugas");
//     var data = {
//         judul_tugas: judul_tugas,
//         tgl_deadline: tgl_deadline,
//         kategori: kategori,
//         status_selesai: status_selesai,
//         catatan: catatan
//     };
//     var request = objectStore.add(data);
//     request.onsuccess = function () {
//         console.log("Data berhasil disimpan");
//     };
//     request.onerror = function () {
//         console.log("Data gagal disimpan");
//     };
// }

// iki mbaca tugas
// export async function bacatugas(callback) {
//     await dbReadyPromise;
//     var transaksi = db.transaction(["tabel_tugas"], "readonly");
//     var objectStore = transaksi.objectStore("tabel_tugas");
//     var request = objectStore.getAll();
//     request.onsuccess = function () {
//         callback(request.result);
//     };
//     request.onerror = function () {
//         console.log("Gagal membaca data");
//     };
// }

// iki ngambil liwat id nk diklik
// export async function ambilsatutugas(id, callback) {
//     await dbReadyPromise;
//     var transaksi = db.transaction(["tabel_tugas"], "readonly");
//     var objectStore = transaksi.objectStore("tabel_tugas");
//     var request = objectStore.get(id);
//     request.onsuccess = function () {
//         callback(request.result);
//     };
//     request.onerror = function () {
//         console.log("Gagal mengambil data");
//     };
// }

// iki update
// export async function updatetugas(id, judul_tugas, tgl_deadline, kategori, status_selesai, catatan) {
//     await dbReadyPromise;
//     var transaksi = db.transaction(["tabel_tugas"], "readwrite");
//     var objectStore = transaksi.objectStore("tabel_tugas");
//     var data = {
//         id: id,
//         judul_tugas: judul_tugas,
//         tgl_deadline: tgl_deadline,
//         kategori: kategori,
//         status_selesai: status_selesai,
//         catatan: catatan
//     };
//     var request = objectStore.put(data);
//     request.onsuccess = function () {
//         console.log("Data berhasil diupdate");
//     };
//     request.onerror = function () {
//         console.log("Gagal update");
//     };
// }

// iki hapus
// export async function hapustugas(id) {
//     await dbReadyPromise;
//     var transaksi = db.transaction(["tabel_tugas"], "readwrite");
//     var objectStore = transaksi.objectStore("tabel_tugas");
//     var request = objectStore.delete(id);
//     request.onsuccess = function () {
//         console.log("Data berhasil dihapus");
//     };
//     request.onerror = function () {
//         console.log("Gagal menghapus data");
//     };
// }