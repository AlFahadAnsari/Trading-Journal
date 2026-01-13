"use client";
import Link from 'next/link'
import { SidebarTrigger } from '@/components/ui/sidebar';


const Navbar = () => {


    return (
        <div className='p-4 flex justify-between items-center'>
            <SidebarTrigger size={'icon-lg'}/>
            <div className='flex justify-center  gap-4'>
                <Link href={"/"} className='text-2xl text-center md:text-3xl font-bold font-sans'>AJ TRADER </Link>
            </div>
        </div>
    )
}

export default Navbar