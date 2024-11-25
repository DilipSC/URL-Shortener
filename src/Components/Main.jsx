import React, { useState } from 'react';
import Spline from '@splinetool/react-spline';

export default function Main() {
    const [lurl, setlUrl] = useState('');
    const [surl, setSurl] = useState('');

    const handleChange = (e) => {
        setlUrl(e.target.value);  
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const rurl = await fetch('https://url-shortener-1-l8gp.onrender.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ longUrl: lurl }),  
            });

            if (rurl.ok) {
                const data = await rurl.json();  
                setSurl(data.shortUrl);  
            } else {
                console.error('Failed to shorten URL:', rurl.statusText);
            }
        } catch (error) {
            console.error('Error fetching short URL:', error);
        }
    };

    return (
        <div className="relative h-screen w-screen overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Spline scene="https://prod.spline.design/HeDs4nczSXdb9hpu/scene.splinecode" />
            </div>

            <div className="relative z-10 flex justify-center items-center h-full ">
                <form onSubmit={handleSubmit} className="rounded-lg p-8 shadow-lg">
                    <label className='block text-center text-4xl font-bold text-white mb-4 font-Teko'>
                        Enter URL to be Shortened
                    </label>
                    <input 
                        className="mt-6 mb-6 rounded-lg border-2 border-sky-600 focus:border-sky-500 focus:ring focus:ring-sky-300 transition-shadow duration-300 p-6 w-[700px] text-gray-700 placeholder-gray-400"
                        type="text"
                        name="url"
                        value={lurl}
                        onChange={handleChange}  
                        placeholder="Enter your URL"
                    />

                    <div className='flex justify-center'>
                        <button className='bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 rounded-lg hover:ease-in hover:duration-700 p-4 text-white font-semibold font-Teko' type='submit'>
                            Convert to Short URL
                        </button>
                    </div>
                </form>

                {surl && (
                    <div className="text-black mt-6 rounded-lg bg-white p-6">
                        <h3 className="font-bold">Shortened URL:</h3>
                        <a href={`https://url-shortener-1-l8gp.onrender.com/${surl}`} target="_blank" rel="noopener noreferrer">
                            {`https://url-shortener-1-l8gp.onrender.com/${surl}`}
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}
