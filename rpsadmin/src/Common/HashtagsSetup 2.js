import React from 'react';
import firebase from 'firebase';
import { isObject } from 'util';

export function GetHashtags(facultyName){
    let fac2="anotherFacultyForValidation";
    if(facultyName==="כלכלה ומנהל עסקים"){
        fac2="מנהל עסקים וכלכלה"
    }
    const hashtagsForFaculties = [];
    const hashtagsFromFaculties = [];
    let ref2 = firebase.database().ref('RuppinProjects');
    ref2.once('value',(snapshot)=>{
        snapshot.forEach((project)=>{
            if(project.val().Faculty===facultyName || project.val().Faculty===fac2){
                if (project.val().HashTags) {
                    project.val().HashTags.forEach((hash)=>{
                        if(isObject(hash)){
                            hashtagsForFaculties.push(hash.value);
                        }
                        else hashtagsForFaculties.push(hash);
                    })
                }
            }
        })
    }).then(()=>{
        const ref3 = firebase.database().ref('Data').child('Ruppin').child('Faculties').child(facultyName).child('HashTags');
        ref3.once('value',(snapshot)=>{
            snapshot.forEach((hash)=>{
                if(hash.val().Value===0){
                    hashtagsFromFaculties.push(hash.val());
                }
            })
        }).then(()=>{CalculateHashtags(facultyName,hashtagsForFaculties,hashtagsFromFaculties);})
    })
}
function CalculateHashtags(fac,hashtags,hashtagsFromFaculties){
    let HashTags=[];
    let counter=0;
    for (let i = 0; i < hashtags.length; i++) {
        counter=0;
        for (let j = 0; j < hashtags.length; j++) {
            if(hashtags[i]===hashtags[j]){
                counter++;
            }
        }
        let hash={
            Name:hashtags[i],
            Value:counter
        }
        HashTags.push(hash);
    }
    hashtagsFromFaculties.forEach((hash)=>{
        HashTags.push(hash);
    })
    HashTags.sort(function(a, b) {
        return parseFloat(b.Value) - parseFloat(a.Value);
    });
    const Hashs = Array.from(new Set(HashTags.map(x=>x.Name)))
    .map(Name=>{
        return {Name:Name,Value:HashTags.find(s=>s.Name===Name).Value}
    })
    SaveHashtagsToFirebase(fac,Hashs);
}
function SaveHashtagsToFirebase(faculty,newHashtags){
    newHashtags.sort(function(a, b) {
        return parseFloat(b.Value) - parseFloat(a.Value);
    });
    const ref = firebase.database().ref('Data').child('Ruppin').child('Faculties').child(faculty);
    ref.update({HashTags:newHashtags})
}