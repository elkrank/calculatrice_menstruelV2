window.indexedDB = window.indexedDB || window.mozIndexedDB || 
window.webkitIndexedDB || window.msIndexedDB;

let request = window.indexedDB.open("CycleDB",1),
db,
tx,
store,
index;

request.onupgradeneeded = function(e){
    let db = request.result,
        store = db.createObjectStore("cyclestore",{keypath:"debut_cycle"}),
        index = store.createIndex("ovulation","ovulation",{unique:false});

};

request.onerror = function(e) {
    console.log("il y a une erreur:" + e.target.errorCode);
};

request.onsuccess = function(e){
    db = request.result;
    tx = db.transaction("cyclestore","readwrite");
    store = tx.objectStore("cyclestore");
    index = store.index("ovulation");

    db.onerror = function (e){
        console.log("error" + e.target.errorCode);
    }

    store.put({
        debut_cycle:dateDebut,fin_cycle:dateFin,debut_fecondation:debutFecondation,fin_fecondation:finFecondation,ovulation:ovulation,prochaine_regle:prochaineRegle
    });
    tx.oncomplete = function(){
        db.close;
    }

};