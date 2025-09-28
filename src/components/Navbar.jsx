import React from 'react'

const Navbar = () => {
  return (
    <nav class="flex items-center justify-between bg-[#FAF9F6] p-5 text-[#3D6B73]">
        <div class="flex items-center gap-15">
            <div class="font-bold text-2xl">
                Craft
            </div>

            <div class="flex items-center gap-10">
                <a href="#" class="font-semibold text-[#3D6B73] hover:text-[#5fafbd]">Dashboard</a>
                <a href="#" class="font-semibold text-[#3D6B73] hover:text-[#5fafbd]">Tutorials</a>
                <a href="#" class="font-semibold text-[#3D6B73] hover:text-[#5fafbd]">Categories</a>
            </div>
        </div>

        <div class="flex items-center gap-7">
    
            <a href="#" class="hover:text-blue-200">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            </a>

            <a href="#" class="hover:text-blue-200">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
            </a>

            <a href="#" class="hover:text-blue-200">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
            </a>

        </div>
    </nav>
  )
}

export default Navbar
