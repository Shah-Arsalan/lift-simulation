const numOfFloors = document.querySelector("#flr-val");
const numOfLifts = document.querySelector("#lift-val");
const button = document.querySelector(".btn");
const qnModal = document.querySelector(".questions-modal");
const landingPage = document.querySelector(".landing");
const floors = document.querySelector(".floor-container");
floors.style.display ="none"
button.addEventListener("click",toLiftPage);


function toLiftPage (){
    qnModal.style.display = "none";
    landingPage.style.display = "none";
    floors.style.display ="block"

    



    for(let i= numOfFloors.value; i>0 ; i--){
   const upButton = document.createElement("button");
   const downButton = document.createElement("button");
   const buttonsDiv = document.createElement("div");
   const floor = document.createElement("div");
   const liftContainer = document.createElement("div");
   const floorNumContainer = document.createElement("div")
   floorNumContainer.innerText = `Floor ${i}`
   liftContainer.style.display = "flex"

   buttonsDiv.style.display = "flex";
   buttonsDiv.style.height = "100%";
   buttonsDiv.style.gap = "1rem"
   buttonsDiv.style.justifyContent = "center";
   buttonsDiv.style.alignItems = "center";
   buttonsDiv.style.flexDirection = "column";

   upButton.style.backgroundColor = "black";
   downButton.style.backgroundColor = "black";
   upButton.style.padding = ".5rem";
   downButton.style.padding = ".5rem";
   upButton.style.color= "white";
   downButton.style.color = "white";
   upButton.style.border= "none";
   downButton.style.border = "none";
   upButton.style.borderRadius= ".5rem";
   downButton.style.borderRadius = ".5rem";
   upButton.style.cursor= "pointer";
   downButton.style.cursor = "pointer";
   upButton.style.padding= " .5rem 1rem .5rem 1rem  ";
   

   liftContainer.style.justifyContent = "flex-start"
   liftContainer.style.gap = "1rem";
   liftContainer.style.width = "80%";
   upButton.innerText = "UP";
   downButton.innerText = "DOWN";
   buttonsDiv.appendChild(upButton);
   buttonsDiv.appendChild(downButton);
    floor.style.display = "flex"
    floor.style.justifyContent ="space-between"
    floor.style.alignItems="center"
    floor.style.height = "10rem"
    floor.style.borderBottom = "1px solid black"
    floor.style.width = "100%";
    floor.style.gap = "1rem";
    floor.classList.add(`floor${i}`)
    floor.setAttribute("status", "waiting")
    floor.setAttribute("floor-number", i)
    floors.appendChild(floor)
    floor.appendChild(buttonsDiv) 
    floor.appendChild(liftContainer) 
    floor.appendChild(floorNumContainer)
    

    if(i==1){
        for(let j=1 ; j<= numOfLifts.value ; j++) {
            downButton.style.display = "none"
            const lift = document.createElement("div")
            lift.setAttribute("lift-number",j)
            lift.setAttribute("availability","available");
            lift.setAttribute("present-floor",i)
            lift.classList.add(`lift${j}`)
            lift.classList.add(`lift`)
            lift.style.padding = "10px"
        
            
            const leftDoor = document.createElement("div")
            leftDoor.style.width = "50%"
            leftDoor.style.height = "7rem"
            leftDoor.style.backgroundColor = "black"
            leftDoor.classList.add("left-door")
         
            const rightDoor = document.createElement("div")
            rightDoor.style.width = "50%"
            rightDoor.style.height = "7rem"
            rightDoor.style.backgroundColor = "black"
            rightDoor.classList.add("right-door")
            
            const doorContainer = document.createElement("div")
            doorContainer.style.width="100%"
            doorContainer.style.display="flex"
            doorContainer.style.gap = "5px"
           
            doorContainer.style.justifyContent="space-between"
            doorContainer.appendChild(leftDoor)
            doorContainer.appendChild(rightDoor)
            lift.style.height = "7rem";
            lift.style.width = "7rem"
            lift.style.minWidth = 0;
            lift.style.backgroundColor = "silver";
            lift.style.border = "3px solid green";
        
           
            liftContainer.appendChild(lift)
            lift.appendChild(doorContainer)

        }

        const firstLift = document.getElementsByClassName("lift1")[0]
        firstLift.style.marginLeft = "2rem";
       
    }

    if(i ==numOfFloors.value ){
        upButton.style.display = "none"
    }

    upButton.addEventListener("click",()=>moveLift(i));
    downButton.addEventListener("click",()=>moveLift(i));

    }



   
   
}

function moveLift(i){
const currentFloor = document.querySelector(`[class=floor${i}]`);
if(currentFloor.getAttribute("status") === "waiting"){
    let {movingLift ,currDist} = calculateNearestLift(i);
    movingLift.setAttribute("availability", "not-available")
    movingLift.style.border = "3px solid red";
    movingLift.style.transitionDuration = `${currDist * 2}s`;
    movingLift.style.transform =`translateY(-${(i-1)*160}px)`;
    movingLift.setAttribute("present-floor",i)


setTimeout(()=>{
    movingLift.querySelector(".left-door").style.transition = "width 2500ms";
    movingLift.querySelector(".right-door").style.transition = "width 2500ms";
    movingLift.querySelector(".left-door").style.width= "0px";
    movingLift.querySelector(".right-door").style.width= "0px";

},currDist * 2000)

setTimeout(()=>{
    movingLift.querySelector(".left-door").style.transition = "width 2500ms";
    movingLift.querySelector(".right-door").style.transition = "width 2500ms";
    movingLift.querySelector(".left-door").style.width= "56px";
    movingLift.querySelector(".right-door").style.width= "56px";

},currDist * 2000 + 2500)


// transition: width 2s;
    setTimeout(()=>{
        movingLift.setAttribute("availability", "available")
        movingLift.style.border = "3px solid green";
    },currDist * 2000 + 5000)

}
}



function  calculateNearestLift(i){
    const Alllifts = Array.from(document.querySelectorAll(".lift"));
    const availableLifts = Alllifts.filter((ele) => ele.getAttribute("availability") === "available");
    let currDist = 900000;
    if(availableLifts.length > 0){
        for (let k = 0; k < availableLifts.length; k++) {
            if (
              Math.abs(
                parseInt(availableLifts[k].getAttribute("present-floor")) -
                  i
              ) < currDist
            ) {
              currDist = Math.abs(
                parseInt(availableLifts[k].getAttribute("present-floor")) -
                  i
              );
              movingLift = availableLifts[k];
            }
          }
    }
    return {movingLift , currDist};
}
