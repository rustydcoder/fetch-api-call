
console.log("about to fetch burger");
fetch("burger.jpg")
   .then((res) => res.blob())
   .then((img) => {
      const source = URL.createObjectURL(img);
      console.log(source);
      document.getElementById("burger").setAttribute("src", source);
   })
   .catch(err => console.log(err))
console.log("completed");