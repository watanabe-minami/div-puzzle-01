export const getAllNaruto = (url) =>{
    return new Promise((resolve, reject) =>{
        fetch(url)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            resolve(data);
        });
    });
};
