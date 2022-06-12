// import React,{useState,useEffect} from 'react';
// // import './App.css';
// import sample from './sample.json';
// // import {writeJsonFile} from 'write-json-file';



// export const JsonData = () => {
//   const [data,setData]=useState([]);
//   const [item,setItem] = useState([]);
//   const getData=()=>{
//            console.log("sample",sample)
//                    setData(sample)
//                    fetch('sample.xml')
//       .then((res) => res.text())
//       .then(xmlString => new window.DOMParser().parseFromString(xmlString, "text/xml"))
//       .then(data => setItem(data))
//       .catch((err) => {
//         console.log(err);
//       });

//       console.log("AAAAAAAAAAAAAAAA",item)


//   }
//   useEffect(()=>{
//     getData()
//   },[])
//   return (
//     <div className="App">
//      {
//        data && data.length>0 && data.map((item)=>
//          <div>{item.title}{item.firstName}{item.lastName}{item.salary}{item.id}</div>

//       )
//      }
//     </div>
//   );
// }
 import React,{useState,useEffect} from 'react';

//bootstrap

//axios for xml request
import axios from 'axios';

//xml file reader
import XMLParser from 'react-xml-parser';
import sample from './sample.json';



 export const JsonData = () => {

    const [data,setData]=useState([]);
      // useEffect(()=>{
    // getData()
//        var XMLParser = require('react-xml-parser');
// var xml = new XMLParser().parseFromString(sample);    // Assume xmlText contains the example XML
// console.log("GGG")
//   },[])




//     const getData = ()=>{
//      //get data request
//       // axios.get('/assets/users.xml', {
//       //   "Content-Type": "application/xml; charset=utf-8"
//       //  }).then(res => 
//       //   {
//         //Storing users detail in state array object
//         // const jsonDataFromXml = new XMLParser().parseFromString(sample);
        
      
//         // setData({ name: jsonDataFromXml.getElementsByTagName('name') })
//                         // setData(sample)

//   axios.get(sample, {
//    "Content-Type": "application/xml; charset=utf-8"
// })
// .then((response) => {
//    console.log('Your xml file as string', response.data);
//      // const jsonDataFromXml = new XMLParser().parseFromString(response.data);

//      // setData({ name: jsonDataFromXml.getElementsByTagName('name') })
//          setData(response.data);

// });

//          console.log("data",data)
       
       
//            // }); 
//     }
 
  
    return (
    
      <div className="container p-5">

      <h1>sssssssss</h1>

      <div >{JSON.stringify(sample

        )}</div>
       
        <ul class="list-group">
      
       {/* {(
      data.name.map((item, index) => {
        return (
          <li class="list-group-item">{item.value}</li>
        )
        }
      ))}*/}

    {/*  <div>
      Parse XML using ReactJs
      {(data && data.length > 0) &&
      data.employees.map((item) => {
        return (
          <span>{item.firstname}</span>
        )
      })
    }
    </div>*/}


    
    </ul>
    </div>
     
)
};


// export default App;

