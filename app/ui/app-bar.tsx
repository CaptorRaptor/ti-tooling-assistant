'use client'

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import TILogo from './ti-logo';
import Link from 'next/link';
import { usePathname } from 'next/navigation'

const navigation = [
    { name: 'String Tool', href: '/'},
    { name: 'Gradient Creator', href: '/gradient-creator'},
    { name: 'Item Storage', href: '/item-storage'},
    { name: 'ASCII Draw Pad', href: '/ascii-draw-pad'},
    { name: 'Outfit Helper', href: '/outfit-helper'},
]

export default function AppBar() {
    const path = usePathname();
    return (
        <Disclosure as="nav" className="bg-primary">
            <div className="mx-auto max-w-full px-2 lg:px-6 lg:px-8">
                <div className="relative flex h-fit min-h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
                        {/* Mobile menu button*/}
                        <DisclosureButton className="group relative inline-flex items-center justify-center icon-button p-2 text-text/80 hover:text-text">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                            <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                        </DisclosureButton>
                    </div>
                    <div className="flex flex-1 items-center justify-center lg:items-stretch">
                        <div className="flex shrink-0 items-center">
                            <TILogo/>
                        </div>
                        <div className="vertical-divide hidden lg:inline-block h-8 mx-6"/>
                        <div className="hidden lg:block">
                            <div className="flex space-x-4">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        aria-current={ (path === item.href) ? 'page' : undefined}
                                        className={clsx(
                                        (path === item.href) ? 'bg-primary-dark text-text' : 'text-text/80 hover:bg-secondary hover:text-text',
                                        'rounded-md px-3 py-2 text-lg font-medium no-underline',
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <DisclosurePanel className="lg:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3">
                    {navigation.map((item, ) => (
                        <DisclosureButton
                            key={item.name}
                            as={Link}
                            href={item.href}
                            aria-current={ (path === item.href) ? 'page' : undefined}
                            className={clsx(
                                (path === item.href) ? 'bg-primary-dark text-text' : 'text-text/80 hover:bg-secondary hover:text-text',
                                'block rounded-md px-3 py-2 text-base font-medium no-underline',
                            )}
                        >
                            {item.name}
                        </DisclosureButton>
                    ))}
                </div>
            </DisclosurePanel>
        </Disclosure>
    )
}