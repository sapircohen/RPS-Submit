import React from 'react';
import firebase from 'firebase';
import { isObject } from 'util';

// export function NewHashtagsSetup(facultyName,newHashtag){
//     const ref = firebase.database().ref('Data').child('Ruppin').child('Faculties').child(facultyName).child('HashTags');
//     ref.on('value',snapshot=>{
//         snapshot.forEach((hash)=>{
//             if(newHashtag.value===hash.val().Name){
//                 ref.child(hash.key).update({Name:hash.val().Name,Value:(hash.val().Value+1)})
//             }
//             else {
                
//             }
//         })
//     })
// }
// export function RemoveHashtagsSetup(facultyName,newHashtag){
//     const ref = firebase.database().ref('Data').child('Ruppin').child('Faculties').child(facultyName).child('HashTags');
//     ref.on('value',snapshot=>{
//         snapshot.forEach((hash)=>{
//             if(newHashtag.value===hash.val().Name && hash.val().Value!==1){
//                 // ref.child(hash.key).update({Name:hash.val().Name,Value:(hash.val().Value-1)})
//                 // .then(()=>{
//                     SortAndUpdateHashtags(facultyName);
//                 //})
//             }
//             else {
//                 ref.child(hash.key).remove();
//             }
//         })
//     })
// }

// function SortAndUpdateHashtags(facultyName){
//     const hastagsToSort= getHashtags(facultyName);
//     hastagsToSort.sort(function(a, b) {
//         return parseFloat(b.Value) - parseFloat(a.Value);
//     });
//     console.log(hastagsToSort);
//     //const ref2 = firebase.database().ref('Data').child('Ruppin').child('Faculties').child(facultyName);
//     //ref2.update({HashTags:hastagsToSort})
// }
// function getHashtags(facultyName){
//     const ref = firebase.database().ref('Data').child('Ruppin').child('Faculties').child(facultyName).child('HashTags');
//     const hastagsToSort=[];
//     ref.on('value',snapshot=>{
//         snapshot.forEach((hash)=>{
//             hastagsToSort.push(hash);
//         })
//         return hastagsToSort;
//     })
// }

// // function UpdateFucltyHashs(newSortedHashtags){
//     // newSortedHashtags.sort(function(a, b) {
//     //     return parseFloat(b.Value) - parseFloat(a.Value);
//     // });
//     const ref = firebase.database().ref('Data').child('Ruppin').child('Faculties').child(faculty);
//     ref.update({HashTags:newSortedHashtags})
// }

// HashtagsUpdate = ()=>{
//     if( window.confirm('update hashtags for all faculties?')){
//         this.CreateHashtags();
//     }
//     else{
//         //hashtags update not confirmed
//     }
// }
export function GetHashtags(facultyName){
    let fac2="anotherFacultyForValidation";
    if(facultyName==="כלכלה ומנהל עסקים"){
        fac2="מנהל עסקים וכלכלה"
    }
    const hashtagsForFaculties = [];
    let ref2 = firebase.database().ref('RuppinProjects');
    ref2.on('value',(snapshot)=>{
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
        CalculateHashtags(facultyName,hashtagsForFaculties);
    })
}
function CalculateHashtags(fac,hashtags){
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
    console.log(newHashtags)
    const ref = firebase.database().ref('Data').child('Ruppin').child('Faculties').child(faculty);
    ref.update({HashTags:newHashtags})
}