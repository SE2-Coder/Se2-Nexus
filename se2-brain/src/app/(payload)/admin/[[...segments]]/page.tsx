/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. - DEBUG ROUTES 2 */
import type { Metadata } from 'next'

import * as configModule from '../../../../payload.config'
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import { importMap } from '../importMap'

// import { isRedirectError } from 'next/dist/client/components/redirect'

const config = configModule.default || configModule

type Args = {
    params: Promise<{
        segments: string[]
    }>
    searchParams: Promise<{
        [key: string]: string | string[]
    }>
}

export const generateMetadata = async ({ params, searchParams }: Args): Promise<Metadata> => {
    // console.log('--- DEBUG METADATA ---')
    try {
        return await generatePageMetadata({ config, params, searchParams })
    } catch (e) {
        console.error('Metadata generation failed:', e)
        return { title: 'Admin' }
    }
}

const Page = async ({ params, searchParams }: Args) => {
    const resolvedConfig = await config


    return await RootPage({
        config,
        params,
        searchParams,
        importMap
    })
}

export default Page
