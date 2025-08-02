'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import Loading from './Loading'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import axios from 'axios'
import Genres from './Genres'
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
 const searchParams = useSearchParams();
const movieParam = searchParams.get("movie") ?? "avengers";
       const [isLoading,setIsLoading]=useState(false);
       const [isImgLoading,setIsImgLoading]=useState(false  );
    const [movie,setMovie]=useState<IMovie>();
   useEffect(() => {
    setIsLoading(true);
    setIsImgLoading(true);

    axios.get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
            api_key: process.env.NEXT_PUBLIC_API_KEY,
            query: movieParam,
        },
    }).then((res) => {
        const movieId = res?.data?.results?.[0]?.id;
        if (!movieId) {
            setIsLoading(false);
            return;
        }

        axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
            params: {
                api_key: process.env.NEXT_PUBLIC_API_KEY,
                append_to_response: "videos",
            },
        }).then((res) => {
            setMovie(res.data);
            setIsLoading(false);
            console.log(res.data);
        });
    });
}, [movieParam]);

  return (
    <div className='bg-black w-screen h-screen opacity-90 flex items-center border-t border-amber-100  px-6 md:px-20'>
    {isLoading && <Loading />}
<div className='flex flex-col md:flex-row gap-10 py-20 items-center md:items-start'>
    <div className='mx-auto flex-none relative'>
 <Image src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
alt='Image'
width={300}
            height={450} className='w-[300px] object-cover' onLoadingComplete={()=>setIsImgLoading(false)
            } priority/>
            {isImgLoading && <Loading /> }
    </div>
    <div className='space-y-6'>
        <div className='uppercase-translate-y-3 text-[26px] md:text-[34px] font-medium pr-4 text-white'>
            {movie?.title}
        </div>
<div className="flex gap-4 flex-wrap">
{movie?.genres?.map((genre,index)=>(
    <Genres
    key={genre?.id}
    index={index}
    length={movie?.genres?.length}
    name={genre?.name}
    />
))}
</div>
<div className='flex flex-col md:flex-row gap-2 text-white md:gap-6'>
<div>Language:{movie?.original_language?.toUpperCase()}</div>
<div>Release:{movie?.release_date}</div>
<div>Runtime:{movie?.runtime}MIN.</div>
<div>Rating:{movie?.vote_average}⭐</div>
</div>
<div className='pt-14 text-white space-y-2 pr-4'>
    <div>OVERVIEW:</div>
    <div className='lg:line-clamp-4'>{movie?.overview}</div>

</div>
    </div>
</div>
    </div>
  )
}

export default HomePage
