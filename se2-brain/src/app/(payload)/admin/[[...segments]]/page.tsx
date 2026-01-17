/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. - DEBUG IMPORT 1 */
import type { Metadata } from 'next'

import * as configModule from '../../../../payload.config'
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import { importMap } from '../importMap'
import { isRedirectError } from 'next/dist/client/components/redirect'

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
    console.log('--- DEBUG METADATA ---')
    try {
        return await generatePageMetadata({ config, params, searchParams })
    } catch (e) {
        console.error('Metadata generation failed:', e)
        return { title: 'Admin' }
    }
}

const Page = async ({ params, searchParams }: Args) => {
    console.log('--- DEBUG PAGE ---')
    console.log('Config Module Keys:', Object.keys(configModule))
    console.log('Config Module Default:', !!configModule.default)
    console.log('Resolved Config Keys:', Object.keys(config || {}))

    try {
        return await RootPage({
            config: Promise.resolve(config),
            params,
            searchParams,
            importMap
        })
    } catch (error) {
        if (isRedirectError(error)) {
            throw error
        }
        console.error('--- DEBUG ERROR CAUGHT ---')
        console.error(error)
        throw error
    }
}

export default Page
