const formatDate = (date:string) =>{
    const separado = date.split("-");
    return `${separado[2].split("T")[0]}/${separado[1]}/${separado[0]}`
}

export default formatDate;
