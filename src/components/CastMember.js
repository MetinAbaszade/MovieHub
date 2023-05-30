// Libraries
import React from 'react'
// Styles
import '../assets/CastMember.css'

export default function CastMember({ castmember }) {
    return (
        <div className="mx-3 mb-3 block rounded-lg bg-white  dark:bg-neutral-700">
            <div
                className="cast-member relative overflow-hidden bg-cover bg-no-repeat w-100"
                data-te-ripple-init
                data-te-ripple-color="light">
                <img
                    className="object-cover"
                    src={`https://image.tmdb.org/t/p/w300${castmember?.profile_path}`}
                    alt="" />
                <div
                    className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
            </div>
            <div>
                <h5
                    className="m-2 text-xl font-medium leading-tight text-neutral-800 dark:text-zinc-950">
                    {castmember.name}
                </h5>
                <p className='m-2 text-base text-neutral-800 dark:text-zinc-950'>{castmember.character}</p>
            </div>
        </div>
    )
}
