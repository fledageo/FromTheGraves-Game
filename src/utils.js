export const canvas = document.querySelector("#canvas");
export const ctx = canvas.getContext("2d");



export function rndX(start = 0,limit){
    let rnd = start + Math.floor(Math.random() * (limit - start));
    if(rnd > 0 && rnd < canvas.width){
       return rnd + canvas.width; 
    }else{
        return rnd;
    }
}

export function rndY(start = 0,limit){
    let rnd = start + Math.floor(Math.random() * (limit - start));
    if(rnd > 0 && rnd < canvas.height){
       return rnd + canvas.height; 
    }else{
        return rnd;
    }
}

export function rndNum(start,limit){
    return start + Math.floor(Math.random() * (limit - start));
}
