let foodArr = ["shrimps.jpg", "tacos.jpg", "burger.jpg"]

console.log("about to fetch burger");
for (const food of foodArr) {
   fetch(food)
      .then(res => res.blob())
      .then(blob => {
         const source = URL.createObjectURL(blob);
         const img = new Image()
         img.src = source
         img.width = 200
         document.body.append(img)
         console.log(img)
      })
      .catch(err => {
         console.log("error")
         console.log(err)
      })
}
console.log("completed");