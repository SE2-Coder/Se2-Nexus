/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import type { Metadata } from 'next'

import config from '@payload-config'
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import { importMap } from '../importMap'

type Args = {
    params: Promise<{
        segments: string[]
    }>
    searchParams: Promise<{
        [key: string]: string | string[]
    }>
}

export const generateMetadata = async ({ params, searchParams }: Args): Promise<Metadata> =>
    generatePageMetadata({ config, params: await params, searchParams: await searchParams })

const Page = async ({ params, searchParams }: Args) =>
    RootPage({ config: Promise.resolve(config), params, searchParams, importMap })

export default Page
