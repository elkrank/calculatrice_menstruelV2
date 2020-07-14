let graphData = [];
let graphLabel = [];

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


        console.log(datas);
        for (let i = 0; i < datas.length; i++) {
            let a = moment(datas[i].debut_cycle);
            let b = moment(datas[i].fin_cycle);
            let diff = b.diff(a, 'days');
            graphLabel.push(a._d.toLocaleDateString());
            graphData.push(diff);
            console.log(datas[i]);
            console.log(diff);

        }
        var ctx = document.getElementById('myChart').getContext('2d');


        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: graphLabel,

                datasets: [{
                    label: 'Nombre de jours du cycle',
                    data: graphData,
                    barThickness: 6,
                    barPercentage: 0.3,
                    backgroundColor: function (context) {
                        var index = context.dataIndex;
                        var value = context.dataset.data[index];
                        return value > 28 ? 'red' :  // superieur à 28 jour en gris
                            index % 2 ? 'green' : 'green'
                    },
                    borderColor:
                        function (context) {
                            var index = context.dataIndex;
                            var value = context.dataset.data[index];
                            return value > 28 ? 'red' :  // superieur à 28 jour en gris
                                index % 2 ? 'green' :    // 
                                    'green'
                        },

                    borderWidth: 1
                }]
            },
            options: {

                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
        tx.oncomplete = function () {

            db.close;
        };
    }
}
console.log(graphLabel, graphData);