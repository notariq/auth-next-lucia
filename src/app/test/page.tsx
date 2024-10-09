import { PrismaClient } from '@prisma/client'
import React from 'react'

export default async function page() {
    const prisma = new PrismaClient()

    const allUser = await prisma.user.findMany()

    return (
        <div className="h-screen w-screen flex justify-center items-center">
        <table className="m-auto rounded">
            <thead className="bg-gray-800">
            <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
            </tr>
            </thead>
            <tbody>
            {allUser.map((user) => (
                <tr key={user.id}>
                    <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                    <td className='border border-gray-300 px-4 py-2'>
                        <button
                            className='w-full text-center bg-red-800 rounded px-2 py-1'
                            //onClick={() => handleDelete(user.id)}
                        >   
                            Delete
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    )
}
