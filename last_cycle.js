let request = window.indexedDB.open("CycleDB", 1),
    db,
    tx,
    store,
    index;
request.onsuccess = function (e) {



    db = request.result;
    tx = db.transaction("cyclestore", "readwrite");
    store = tx.objectStore("cyclestore");


    store.getAll().onsuccess = function (event) {

        datas = event.target.result;



        for (let i = 0; i <= datas.length; i++) {
            document.getElementById("sg-debut").innerHTML = datas[i].debut_cycle.toLocaleDateString();
            document.getElementById("sg-prochaine").innerHTML = datas[i].fin_cycle.toLocaleDateString();
            document.getElementById("sg-debutFecondation").innerHTML = datas[i].debut_fecondation.toLocaleDateString();
            document.getElementById("sg-ovule").innerHTML = datas[i].ovulation.toLocaleDateString();
            document.getElementById("sg-finFecondation").innerHTML = datas[i].fin_fecondation.toLocaleDateString();
        }
        tx.oncomplete = function () {

            db.close;
        };
    }
}