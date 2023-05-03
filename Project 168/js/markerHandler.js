AFRAME.registerComponent("marker-handler", {
  init: async function () {

    //get the toys collection from firestore database
    var toys = await this.getToys();

    //markerFound event
    this.el.addEventListener("markerFound", () => {
      var markerId = this.el.id;      
      this.handleMarkerFound(toys, markerId);
    });

    //markerLost event
    this.el.addEventListener("markerLost", () => {
      this.handleMarkerLost();
    });

  },
  handleMarkerFound: function (toys, markerId) {
    // Changing button div visibility
    var buttonDiv = document.getElementById("button-div");
    buttonDiv.style.display = "flex";

    var orderButton = document.getElementById("order-button");
    var orderSummaryButtton = document.getElementById("order-summary-button");

    // Handling Click Events
    orderButton.addEventListener("click", function () {
      swal({
        icon: "warning",
        title: "Rate Toy",
        text: "Work In Progress"
      });
    });

    orderSummaryButtton.addEventListener("click", () => {
      swal({
        icon: "https://i.imgur.com/4NZ6uLY.jpg",
        title: "Thanks For Order !",
        text: "Your order will be delivered soon!"
      });
    });

    // Changing Model scale to initial scale
    var toy = toys.filter(toy => toy.id === markerId)[0];

    var model = document.querySelector(`#model-${toy.id}`);
    model.setAttribute("position", toy.model_geometry.position);
    model.setAttribute("rotation", toy.model_geometry.rotation);
    model.setAttribute("scale", toy.model_geometry.scale);
  },

  handleMarkerLost: function () {
    // Changing button div visibility
    var buttonDiv = document.getElementById("button-div");
    buttonDiv.style.display = "none";
  },
  //get the toys collection from firestore database
  getToys: async function () {
    return await firebase
      .firestore()
      .collection("toys")
      .get()
      .then(snap => {
        return snap.docs.map(doc => doc.data());
      });
  }
});

  