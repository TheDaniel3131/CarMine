"use client"

import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Home() {
    const [data, setData] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://your-ec2-instance-url/api/data')
                setData(response.data)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()
    }, [])

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Data from ASP.NET Backend:</h1>
            {data ? (
                <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(data, null, 2)}</pre>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}