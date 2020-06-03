let foodArr = ["shrimps.jpg", "tacos.jpg", "burger.jpg"]

async function fetchImages(imgs) {
   for (const img of imgs) {
      const res = await fetch(img)
      const blob = await res.blob()
      const image = new Image()
      image.src = URL.createObjectURL(blob)
      image.width = 200
      document.body.appendChild(image)
   }
}

fetchImages(foodArr)