import React, {useEffect, useState} from 'react'

function Imageapp() {

    let [search, setSearch] = useState("coding");
    const [data , setData] = useState([]);
    const [page , setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    let API_KEY = '8C6GlZ0HS-rUIa5rstX0fFamcW-gzkhLM22J8Ckl5QM';
    let IMAGES_PER_PAGE = 15;

    // useEffect(() =>{
    //     myFun();
    // },[page]);

    // const handleSearch=(event)=> {
    //     setSearch(event.target.value);
    //     //setPage(1);
    // }
    const getData=()=>{
        setPage(1);
        myFun();
    }
    const myFun =async()=>{
       // if(search!==""){
        const get = await fetch(`https://api.unsplash.com/search/photos?page=${page}&per_page=${IMAGES_PER_PAGE}&query=${search}&client_id=${API_KEY}`)
        const jsonData = await get.json()
        console.log(jsonData.results);
        setData(jsonData.results);
        setTotalPages(jsonData.total_pages);
        // else{
        //     console.log("Data not found");
        // }
    }

    useEffect(() =>{
        myFun();
    },[page]);
    //console.log('page', page);

    const handleSelection =(selection)=>{
        search=selection;
        getData();
    }

  return (
    <div className='container'>
        <h1 className='head'> Image Generator App </h1>
        <div className='inputs'> 
            <input type='text' placeholder='Type something to search...' search={search} onChange={(event)=>{
                if(event.target.value!==""){
                    setSearch(event.target.value);
                }
                else{
                    setSearch("coding");
                }
            }}/>
            <button onClick={getData}>Search</button>
        </div>
        <div className='filters'>
        <button onClick={() => handleSelection('nature')}>Nature</button>
        <button onClick={() => handleSelection('birds')}>Birds</button>
        <button onClick={() => handleSelection('cats')}>Cats</button>
        <button onClick={() => handleSelection('fish')}>Fish</button>
        </div>
        <div className="images">
            {
                data.map((curVal, index)=>{
                    return(
                        <img src={curVal.urls.full} alt="pic"/>
                    )
                })
            }
        </div>    
            <div className='buttons'>
                {page > 1 && <button onClick={()=>setPage(page-1)}>Previous</button>} 
                {page < totalPages && <button onClick={()=>setPage(page+1)}>Next</button>}
            </div> 
    </div>
  )
}

export default Imageapp