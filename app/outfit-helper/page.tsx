'use client'

import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import React from "react";

const isProd = process.env.NODE_ENV === 'production';

export default function OutfitHelper() {
    return (
        <div className="no-scrollbar">
            <div className="card">
                <h1 className="mb-2">Outfit Helper</h1>
                <p>
                    This tool assist in creating consistently colored outfits and layering item short strings for the game <a href='https://ti-legacy.com'>The Inquisition: Legacy</a>.
                </p>              
                <hr className="horizontal-divide md:hidden" />
                <p className="md:hidden"> This feature is unavailable on small screen sizes</p>
            </div>
            <div className="card hidden md:block">
                <div className={clsx("flex flex-col content-center justify-items-center", !isProd && "hidden")}>
                    <ExclamationTriangleIcon className="h-16 text-text/80"/>
                    <h2 className=" text-text/80">Under Construction</h2>
                </div>
                <div className={clsx("", isProd && "hidden")}>
                </div>      
            </div>
        </div>
    );
}
