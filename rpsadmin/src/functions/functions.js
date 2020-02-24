export const ValidateData2=(projectData,templateValidators)=>{
    let isPublish = true;
    let validation = {};
    templateValidators.forEach((validator,key)=>{
        switch (validator.fieldType) {
            case "text":
                if(validator.isLength && !validator.isMandatory){
                    if(projectData[validator.Name]!==''&&(projectData[validator.Name].length<validator.minimum || projectData[validator.Name].length>validator.maximum)){
                        validation= {
                                alertShow:true,
                                alertTitle:'שימו לב',
                                alertText:validator.alertText,alertIcon:'warning',
                                isPublish:false
                        } 
                    }
                }
                else if(validator.isLength && validator.isMandatory){
                    if(projectData[validator.Name].length<validator.minimum || projectData[validator.Name].length>validator.maximum ){
                        validation=  {
                            alertShow:true,alertTitle:'שימו לב',alertText:validator.alertText,alertIcon:'warning',
                            isPublish:false
                        } 
                    }
                }
                else{
                    if(projectData[validator.Name]===''  && validator.isMandatory){
                        validation=  {
                            alertShow:true,alertTitle:'שימו לב',alertText:validator.alertText,alertIcon:'warning',
                            isPublish:false
                        } 
                    }
                }
                break;
            case "array":
                    if(validator.isLength && validator.isMandatory){
                        if(projectData[validator.Name].length<validator.minimum || projectData[validator.Name].length>validator.maximum ){
                            validation=  {
                                alertShow:true,alertTitle:'שימו לב',alertText:validator.alertText,alertIcon:'warning',
                                isPublish:false
                            } 
                        }
                    }
                break;
            case "arraytext":
                    if(validator.isLength && validator.isMandatory){
                        projectData[validator.LinkedArray].forEach((value,index)=>{
                            if(value[validator.Name].length<validator.minimum || value[validator.Name].length>validator.maximum){
                                validation=  {
                                    alertShow:true,alertTitle:'שימו לב',alertText:index + " - "+ validator.alertText,alertIcon:'warning',
                                    isPublish:false
                                } 
                            }
                        })
                        
                    }
                    else if(validator.isMandatory){
                        projectData[validator.LinkedArray].forEach((value,index)=>{
                            if(value[validator.Name]===''){
                                validation=  {
                                    alertShow:true,alertTitle:'שימו לב',alertText:index + " - "+ validator.alertText,alertIcon:'warning',
                                    isPublish:false
                                } 
                            }
                        })
                    }
                break;
            case "select":
                    if((projectData[validator.Name]==='' || projectData[validator.Name]==='בחר') && validator.isMandatory){
                        validation=  {
                            alertShow:true,alertTitle:'שימו לב',alertText:validator.alertText,alertIcon:'warning',
                            isPublish:false
                        } 
                    }
                break;
            case "arrayselect":
                    if((projectData[validator.Name][validator.index]==='' || projectData[validator.Name][validator.index]==='בחר') && validator.isMandatory){
                        validation=  {
                            alertShow:true,alertTitle:'שימו לב',alertText:validator.alertText,alertIcon:'warning',
                            isPublish:false
                        } 
                    }
                break;
            default:
                break;
        }
    })
    return validation;
    
}