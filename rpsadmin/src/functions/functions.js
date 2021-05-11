import firebase from 'firebase';

export const ValidateData2=(projectData,templateValidators)=>{
    let isPublish = true;
    let validation = {isPublish:isPublish};
    try {
        templateValidators.forEach((validator,key)=>{
            switch (validator.fieldType) {
                case "text":
                    if(projectData[validator.Name]!==undefined){
                        if(validator.isLength && !validator.isMandatory){
                            if(projectData[validator.Name]!==''){
                                if(projectData[validator.Name].length<validator.minimum || projectData[validator.Name].length>validator.maximum){
                                    validation= {
                                            alertShow:true,
                                            alertTitle:'שימו לב',
                                            alertText:validator.alertText,alertIcon:'warning',
                                            isPublish:false
                                    } 
                                    return validation;
                                }
                            }
                        }
                        else if(validator.isLength && validator.isMandatory){
                            if(projectData[validator.Name].length<validator.minimum || projectData[validator.Name].length>validator.maximum){
                                validation=  {
                                    alertShow:true,alertTitle:'שימו לב',alertText:validator.alertText,alertIcon:'warning',
                                    isPublish:false
                                } 
                                return validation;
                            }
                        }
                        else{
                            if(projectData[validator.Name]==='' && validator.isMandatory){
                                validation=  {
                                    alertShow:true,alertTitle:'שימו לב',alertText:validator.alertText,alertIcon:'warning',
                                    isPublish:false
                                } 
                                return validation;
                            }
                        }
                    }
                    break;
                case "array":
                    if(projectData[validator.Name]!==undefined){
                        if(validator.isLength && validator.isMandatory){
                            if(projectData[validator?.Name]?.length<validator?.minimum){
                                validation=  {
                                    alertShow:true,alertTitle:'שימו לב',alertText:validator.alertText,alertIcon:'warning',
                                    isPublish:false
                                } 
                                return validation;
                            }
                        }
                    }
                    break;
                case "arraytext":
                        if(validator.isLength && validator.isMandatory){
                            if (projectData[validator.LinkedArray]!==undefined) {
                                projectData[validator.LinkedArray].forEach((value,index)=>{
                                    if(value[validator.Name].length<validator.minimum || value[validator.Name].length>validator.maximum){
                                        validation=  {
                                            alertShow:true,alertTitle:'שימו לב',alertText:index + " - "+ validator.alertText,alertIcon:'warning',
                                            isPublish:false
                                        } 
                                        return validation;
                                    }
                                })
                            }
                        }
                        else if(validator.isMandatory){
                            if (projectData[validator.LinkedArray]!==undefined) {
                                projectData[validator.LinkedArray].forEach((value,index)=>{
                                    if(value[validator.Name]===''){
                                        validation=  {
                                            alertShow:true,
                                            alertTitle:'שימו לב',
                                            alertText:`לסטודנט/ית ה${index+1} ${validator.alertText}`,
                                            alertIcon:'warning',
                                            isPublish:false
                                        } 
                                        return validation;
                                    }
                                })
                            }
                        }
                    break;
                case "select":
                    if(projectData[validator.Name]!==undefined){
                        if((projectData[validator.Name]==='' || projectData[validator.Name]==='בחר') && validator.isMandatory){
                            validation=  {
                                alertShow:true,alertTitle:'שימו לב',alertText:validator.alertText,alertIcon:'warning',
                                isPublish:false
                            } 
                            return validation;
                        }
                    }
                    break;
                case "arrayselect":
                    if(projectData[validator.Name]!==undefined){
                        if((projectData[validator.Name][validator.index]==='' || projectData[validator.Name][validator.index]==='בחר') && validator.isMandatory){
                            validation=  {
                                alertShow:true,alertTitle:'שימו לב',alertText:validator.alertText,alertIcon:'warning',
                                isPublish:false
                            } 
                            return validation;
                        }
                    }
                    break;
                default:
                    break;
            }
        })
        return validation;
    } catch (error) {
        console.log("error in validation function: ",error);
    }  finally{
        return validation;
    }
}

export const getGeneralConfigsTemplates = ()=>{
    const ref = firebase.database().ref('Data').child('Configs');
    ref.once("value", (snapshot)=> {
      snapshot.forEach((config)=>{
          localStorage.setItem(config.key,JSON.stringify(config.val()));          
      })
      }, (errorObject)=> {
          console.log("The read failed: " + errorObject.code);
      }
    )
      
}

export const findCourseForProject = (project)=>{
    let isFound = false;
    firebase.database().ref('Data').child('Ruppin').child('Faculties').child(project.Faculty)
    .child('Departments').child(project.Department)
    .child('Experties').child(project.Major)
    .child('Courses').once('value',snapshot=>{
        snapshot.forEach(async (course)=>{
            if(project.templateSubmit===course.val()['Submit Template'] && !isFound){
                await localStorage.setItem('course', JSON.stringify(course.key));
                isFound=true;
                getConfigsForProject(project,course.key);
            }
        })
    })
}

export const getConfigsForProject =  (project,course)=>{
    firebase.database().ref('Data').child('Ruppin')
    .child('Faculties').child(project.Faculty)
    .child('Departments').child(project.Department)
    .child('Experties').child(project.Major)
    .child('Courses').child(course)
    .once('value',async data=>{
        await localStorage.setItem('TemplateConfig',JSON.stringify(data.val().TemplateConfig?data.val().TemplateConfig:[]))
    })
}