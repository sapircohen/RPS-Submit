function CreateHashtagsList(dataForGroup){
    let tagsList = [];
    if(dataForGroup.HashTags){
        dataForGroup.HashTags.forEach((tag)=>{
            let t={};
            if(tag.__isNew__ || tag.label){
                t = {
                    'value':tag.value,
                    'label':tag.label
                }
            }
            else{
                t = {
                    'value':tag,
                    'label':tag
                }
            }
            tagsList.push(t);
        })
    }
    return tagsList;
}