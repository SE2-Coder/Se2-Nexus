/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. - DEBUG IMPORTMAP 2 */
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
    console.log('--- DEBUG PAGE ---')

    let resolvedConfig: any = config
    if (config instanceof Promise) {
        // console.log('Config is a Promise, awaiting...')
        resolvedConfig = await config
    }

    // Log ImportMap details to verify generation
    try {
        const mapKeys = Object.keys(importMap)
        console.log(`ImportMap Keys Count: ${mapKeys.length}`)
        console.log('ImportMap Sample Keys:', mapKeys.slice(0, 5))
    } catch (e) {
        console.error('Error logging importMap:', e)
    }

    try {
        return await RootPage({
            config: Promise.resolve(resolvedConfig),
            params,
            searchParams,
            importMap
        })
    } catch (error) {
        if (typeof error === 'object' && error !== null && 'digest' in error && (error as any).digest?.startsWith('NEXT_REDIRECT')) {
            throw error
        }
        console.error('--- DEBUG ERROR CAUGHT ---')
        console.error(error)
        throw error
    }
}

export default Page
