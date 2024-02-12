function openInventory(evt, foodName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(foodName).style.display = "block";
    evt.currentTarget.className += " active";
  }
  
  function setButtonColour(element) {
      ///remove old element
      const el = document.querySelector(".button-clicked");
      if(el != null) {
          el.classList.remove("button-clicked");        
      }
  
      ///add new one
      element.classList.add("button-clicked");
  }
  var json;
  fetch('data.json')
    .then(response => response.json())
      .then(data => {
        json = data;
        for(i in data) {
          var button = document.createElement("button");
          button.classList.add("tablinks");
          button.textContent = i;
          document.getElementById("tabs").appendChild(button);
          button.onclick = function() {openInv(this.textContent)};
        }
      })
  
  
  function openInv(el) {
    var foodList = document.getElementById("foodlist")
    while(foodList.lastElementChild) {
      foodList.removeChild(foodList.lastElementChild);
    }
    var data = json[el];
    data.forEach(item => {
      element = document.createElement("button");
      element.classList.add("button");
      element.onclick = function() {setButtonColour(this)}
      element.textContent = item;
      foodList.appendChild(element);
    })
  }