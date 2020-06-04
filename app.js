// DATA: https://data.giss.nasa.gov/gistemp/
// CSV:  https://data.giss.nasa.gov/gistemp/tabledata_v4/ZonAnn.Ts+dSST.csv

getData()
async function getData() {
   const response = await fetch('ZonAnn.Ts+dSST.csv')
   const data = await response.text()
   const table = data.split('\n').slice(1)
   table.forEach(row => {
      const cell = row.split(',')
      const [year, temp, kuda, ...rest] = cell
      console.log(year, temp, kuda)
   })
}