export const createArray = ()=>{
let exportArray= [];
for (let i = 0; i < 53; i++) {
    let element = {
        name: i.toString(),
        code: i
    }
    exportArray.push(element);

    
}

return exportArray;
}