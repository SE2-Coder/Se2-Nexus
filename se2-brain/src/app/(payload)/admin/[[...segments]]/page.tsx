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
    generatePageMetadata({ config, params, searchParams })

const Page = async ({ params, searchParams }: Args) => {
    console.log('--- DEBUG PAGE ---')
    console.log('Config exists:', !!config)
    console.log('ImportMap exists:', !!importMap)
    console.log('ImportMap content:', importMap)
    console.log('Params:', params)

    return RootPage({
        config: Promise.resolve(config),
        params,
        searchParams,
        importMap
    })
}

export default Page
