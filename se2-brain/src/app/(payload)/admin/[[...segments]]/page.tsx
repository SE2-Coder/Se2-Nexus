/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. - FORCE DEPLOY 1 */
import type { Metadata } from 'next'

import config from '../../../../payload.config'
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

export const generateMetadata = async ({ params, searchParams }: Args): Promise<Metadata> => {
    return generatePageMetadata({ config, params, searchParams })
}

const Page = async ({ params, searchParams }: Args) => {
    console.log('--- DEBUG PAGE ---')
    console.log('Config type:', typeof config)
    try {
        console.log('Config keys:', Object.keys(config))
    } catch (e) {
        console.log('Error listing config keys:', e)
    }
    console.log('ImportMap exists:', !!importMap)

    try {
        return await RootPage({
            config: Promise.resolve(config),
            params,
            searchParams,
            importMap
        })
    } catch (error) {
        console.error('--- DEBUG ERROR CAUGHT ---')
        console.error(error)
        throw error
    }
}

export default Page
