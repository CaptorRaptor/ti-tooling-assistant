import Link from 'next/link';
import Image from 'next/image';
import config from '@/next.config'

const title = 'TI: LEGACY TOOL ASSISTANT';

export default function TILogo() {
    return (
        <div className='flex flex-row items-center leading-none space-x-4'>
            <Image src={`${config.basePath}/TI-192x192.png`} width={192} height={192} alt='Logo' className='h-12 w-12'/>
            <Link
                key={'logo-link'}
                href={'/'}
                className='text-text no-underline'
            >            
                <h1>{title}</h1>
            </Link>
        </div>
    );
}
