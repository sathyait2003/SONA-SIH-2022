const readTextFile = (file, callback) => {
    const rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
      if (rawFile.readyState === 4 && rawFile.status == "200") {
        callback(rawFile.responseText);
      }
    console.log(rawFile.responseText)
    };
    rawFile.send(null);
  };
  
  readTextFile("./fake.json", (text) => {
    const dat = JSON.parse(text); 
    const data = dat.fake;
    console.log(dat.fake);
  
    if (!data) {
      alert("Sorry");
    }
    
    const InfoList = document.querySelector(".fakedata");
  
    //For check purpose
    //InfoList.innerHTML = "Info";
  
    if (data.length <= 0) {
      const noinfo = document.createElement("div");
      noinfo.classList.add("noinfo");
      noinfo.innerHTML = `<h1>Currently No <span>Fake</span> Available</h1>`
  
      return InfoList.append(noinfo);
    } else {
      data.forEach((dataItem) => {
        console.log(dataItem.university_name);
        const listItem = document.createElement("div");
        listItem.classList.add("listItem");
  
        listItem.innerHTML = `<h2 class="itemTitle">
        <a href="#">${dataItem.university_name}</a>
        </h2>
        <p class="desc">${dataItem.address}</p>
        <div>${dataItem.state}</div>`;
  
        InfoList.append(listItem);
      });
    }
  });
