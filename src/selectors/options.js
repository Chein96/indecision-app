const optionExists = (options, option) => {
    const result = options.filter(({ description }) => {
        if(description === option){
            return true;
        }
    });
    if(result.length > 0){
        return true;
    }
    else
    {
        return false;
    }
};

export default optionExists;