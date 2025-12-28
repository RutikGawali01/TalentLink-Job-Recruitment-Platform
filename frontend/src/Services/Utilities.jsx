const formateDate = (dateString)=>{
    const date = new Date(dateString);
    const options={year:'numeric', month:'short'};
    return date.toLocaleString('en-US',  options);

}
export {formateDate};