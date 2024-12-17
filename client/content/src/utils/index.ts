

export const debounce = (func:Function, wait:number) => {
    let timeout:number;
    return function(...args:any[]) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}