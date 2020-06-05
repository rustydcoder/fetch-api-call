const cordinates = {
   xs: [],
   ys: {
      mT: [],
      nH: [],
      sH: []
   }
}

async function init() {
   const csv_url = 'ZonAnn.Ts+dSST.csv'
   const response = await fetch(csv_url)
   const data = await response.text()
   const table = data.split('\n').slice(1)

   table.forEach(row => {
      const cell = row.split(',')
      const [year, ...rest] = cell
      cordinates.xs.push(year)
      cordinates.ys.mT.push(parseTemp(rest[0]))
      cordinates.ys.nH.push(parseTemp(rest[1]))
      cordinates.ys.sH.push(parseTemp(rest[2]))
   })
}

async function drawChart({ xs, ys }) {
   await init()

   let colors = ['rgb(255, 99, 132)', 'rgb(255, 159, 64)', 'rgb(255, 205, 86)']

   const ctx = document.getElementById('myChart').getContext('2d')
   let config = {
      type: 'line',
      data: {
         labels: xs,
         datasets: [
            {
               label: 'Means',
               fill: false,
               backgroundColor: colors[0],
               borderColor: colors[0],
               data: ys.mT,
            }
         ]
      },
      options: {
         responsive: true,
         tooltips: {
            mode: 'index',
            intersect: false,
         },
         hover: {
            mode: 'nearest',
            intersect: true
         },
         title: {
            display: true,
            text: 'Chart Of Zonal Annual Means In °C'
         },
         scales: {
            xAxes: [{
               display: true,
               scaleLabel: {
                  display: true,
                  labelString: 'Years'
               }
            }],
            yAxes: [{
               ticks: {
                  callback: function (value, index, values) {
                     return value + '°';
                  },
               },
               display: true,
               scaleLabel: {
                  display: true,
                  labelString: 'Temperature'
               }
            }]
         },
         elements: {
            point: {
               pointStyle: 'crossRot'
            }
         }
      }
   }

   const myChart = new Chart(ctx, config)

   let i = 0;
   document.getElementById('add').addEventListener('click', () => {
      let addOns = [].concat([ys.nH], [ys.sH])
      let labelling = ['Northern Hemisphere', 'Southern Hemisphere']

      let newDataSet = {
         label: labelling[i],
         fill: false,
         backgroundColor: colors[i + 1],
         borderColor: colors[i + 1],
         data: addOns[i],
         borderDash: [5, 5]
      }
      if (config.data.datasets.length < Object.keys(ys).length) {
         config.data.datasets.push(newDataSet)
         i++
      }
      myChart.update()
   })

   document.getElementById('remove').addEventListener('click', () => {
      if (i > 0) {
         config.data.datasets.splice(-1, 1)
         i--
         myChart.update()
      }
   })
}

function parseTemp(n) {
   return parseFloat(n) + 14
}
drawChart(cordinates)
