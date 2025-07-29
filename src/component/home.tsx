'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import Loading from './Loading'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import axios from 'axios'
const HomePage = () => {
 
    interface IMovie{
poster_path:string;
title:string;
genres:[
{
    name:string;
    id:string;
    }
];
original_language:string;
release_date:string;
runtime:string;
vote_average:string;
overview:string;
video:{results:[{type:string; key:string}]};
    }
    const searchParams=useSearchParams();
       const [isLoading,setIsLoading]=useState(false);
       const [isImgLoading,setIsImgLoading]=useState(false  );
    const [movie,setMovie]=useState<IMovie>();
    useEffect(()=>{
        setIsLoading(true)
        setIsImgLoading(true)
        let searchMovie = searchParams.get("movie");
        if(searchMovie=== null){
            searchMovie="avengers"
        }
        axios.get(`http://api.themoviedb.org/3/search/movie`,{
params:{
    api_key: process.env.NEXT_PUBLIC_API_KEY,
    query:searchMovie
}
            }).then((res)=>{
                console.log(res.data);
            }); 
    },[]);
  return (
    <div className='bg-black w-screen h-screen opacity-90 flex items-center border-t border-amber-100'>
    {isLoading && <Loading />}
<div className='flex-col flex gap-10 py-20'>
    <div className='mx-auto flex-none relative'>
 {/*<Image alt='image' src={`https://image.tmdb.org/t/p/w500/?${movie?.poster_path}`}  width={300}
            height={450} />*/}
    </div>
</div>
    </div>
  )
}

export default HomePage
