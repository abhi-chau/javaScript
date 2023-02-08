let input;

input = "no";

// if(input === 1){
//     document.write("continue...");
// }else if(input === "y"){
//     document.write("continue...");
// }else if(input === "yes"){
//     document.write("continue...");
// }else if(input === 0){
//     document.write("End...");
// }else if(input === "n"){
//     document.write("End...");
// }else if(input === "no"){
//     document.write("End...");
// }else{
//     document.write("Wrong input");
// }

// === camprison  

switch(input){
case 1: // if(input === 1)
case "y": // if(input === "y")
case "yes": // if(input === "yes")
    document.write("continue...");
    break;
case 0: // if(input === 0)
case "n": // if(input === "n")
case "no": // if(input === "no")
    document.write("End...");
    break;
default:
    document.write("Wrong input");
    break;
}