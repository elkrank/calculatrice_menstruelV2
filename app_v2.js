function getcycle(){
    var date = new Date((document.getElementById('date').value));// get user date selection
    var dateN1= (date.setDate(date.getDate() + 1));// pour fair jour+1 dans une variable 

    var dureeCycle= document.getElementById('duree-cycle').value;// on recupere l'input du nombre de jours du cycle
    var cycle = new Date((date.setDate(date.getDate())) + (dureeCycle * 86400000)) ; // on addition la date + le nb de jours du cycle
    var cycleToString= cycle.toLocaleDateString(); // on converti en  quelque choses de lisible
    var n = (date.setDate(date.getDate())); 
    console.log(n);
    console.log(date);
    var debutFecondation,finFecondation,prochaine,n4,ovule,cycleVrai


    if (dureeCycle == 0){// si input=0 on gere avec le cycle par defaut


    debutFecondation = new Date(n+864000000); // debut période de fécondation
    finFecondation = new Date(n+1382400000); // fin période de fécondation
    prochaine = new Date (n+2332800000 );//Prochaine regle
    n4 = new Date(n+345600000); // dernier jour des regle
    ovule = new Date( n+1209600000 );// jour d'ovulation

    dateDebut= date.toLocaleDateString();
    datefin=n4.toLocaleDateString();
    prochaineRegle=prochaine.toLocaleDateString();
    dateDebutFecondation=debutFecondation.toLocaleDateString();
    dateFinFecondation=ovule.toLocaleDateString();
    dateOvulation=finFecondation.toLocaleDateString();
    cycleVrai= n - localStorage.getItem("debutCycle") ;
    console.log(typeof(cycleVrai));
    console.log(cycleVrai);

    }
    else{// 
    ovule = new Date(cycle - ((dureeCycle*86400000) /2) );
    debutFecondation = new Date(ovule - (86400000 *4));
    console.log(debutFecondation);

    finFecondation = new Date( ovule.setDate(ovule.getDate()) + 172800000);
    console.log(finFecondation);
    prochaine = new Date (cycle+2332800000 );
    n4 = new Date(n+345600000); // dernier jour des regle
   cycleVrai= localStorage.getItem("debutCycle") - n;
   

    // var STORAGE 
    dateDebut= date.toLocaleDateString();
    datefin=n4.toLocaleDateString();
    prochaineRegle=prochaine.toLocaleDateString();
    dateDebutFecondation=debutFecondation.toLocaleDateString();
    dateFinFecondation=ovule.toLocaleDateString();
    dateOvulation=finFecondation.toLocaleDateString();
  


    }
    document.getElementById("debut").innerHTML = date.toLocaleDateString();
    document.getElementById("fin").innerHTML = n4.toLocaleDateString();
    document.getElementById("prochaine").innerHTML = prochaine.toLocaleDateString();
    document.getElementById("debutFecondation").innerHTML=debutFecondation.toLocaleDateString();
    document.getElementById("finFecondation").innerHTML=finFecondation.toLocaleDateString();
    document.getElementById("ovule").innerHTML = ovule.toLocaleDateString();
   
   //indexedDB//////////////////////////////////////////////////////////////// 
    window.indexedDB = window.indexedDB || window.mozIndexedDB || 
    window.webkitIndexedDB || window.msIndexedDB;
    
    let request = window.indexedDB.open("CycleDB",1),
    db,
    tx,
    store,
    index;
    
    request.onupgradeneeded = function(e){
        let db = request.result,
            store = db.createObjectStore("cyclestore",{autoIncrement:true});
    
    };
    
    request.onerror = function(e) {
        console.log("il y a une erreur:" + e.target.errorCode);
    };
    
    request.onsuccess = function(e){
        


        db = request.result;
        tx = db.transaction("cyclestore","readwrite");
        store = tx.objectStore("cyclestore");
        
    
        db.onerror = function (e){
            console.log("error" + e.target.errorCode);
        }
    
        store.put({
            debut_cycle:date,
            fin_cycle:prochaine,
            debut_fecondation:debutFecondation,
            fin_fecondation:finFecondation,
            ovulation:ovule,
          
        });
  
        
        tx.oncomplete = function(){
            
            db.close;
        }
    
    };
    }




