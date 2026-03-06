function searchBus(){

    let from = document.querySelectorAll("input")[0].value;
    let to = document.querySelectorAll("input")[1].value;
    let date = document.querySelectorAll("input")[2].value;

    if(from === "" || to === "" || date === ""){
        alert("Please fill all fields");
        return;
    }

    alert("Searching buses from " + from + " to " + to + " on " + date);

}
