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
        if (resolvedConfig) {
            console.log('Debug Admin Routes:', resolvedConfig.admin?.routes)
            console.log('Debug Root Routes:', resolvedConfig.routes)
        }

        try {
            return await RootPage({
                config,
                params,
                searchParams,
                importMap: {} // Force empty importMap to allow redirection
            })
        } catch (innerError: any) {
            if (
                typeof innerError === 'object' &&
                innerError !== null &&
                (innerError.digest?.startsWith('NEXT_REDIRECT') || innerError.message === 'NEXT_REDIRECT')
            ) {
                throw innerError;
            }
            console.error('RootPage CRITICAL FAILURE:', innerError);
            return (
                <div style={{ padding: '50px', border: '5px solid red', color: 'red', backgroundColor: '#fff0f0' }}>
                    <h1>RootPage Interface Crash</h1>
                    <p>The RootPage() function threw an error during execution.</p>
                    <pre style={{ overflow: 'auto' }}>
                        {innerError?.toString()}
                        {'\n'}
                        {innerError?.stack}
                    </pre>
                    <hr />
                    <h3>Config Debug:</h3>
                    <pre>{JSON.stringify({
                        adminRoute: resolvedConfig?.admin?.routes,
                        rootRoutes: resolvedConfig?.routes
                    }, null, 2)}</pre>
                </div>
            )
        }
        // return (
        //     <div style={{ padding: '50px', border: '5px solid blue' }}>
        //         <h1>CRITICAL DEBUG: RootPage Bypassed</h1>
        //         <p>If you see this, the config/routes are fine, but RootPage() itself is crashing.</p>
        //         <pre>{JSON.stringify({ 
        //             adminRoute: resolvedConfig?.admin?.routes,
        //             rootRoutes: resolvedConfig?.routes 
        //         }, null, 2)}</pre>
        //     </div>
        // )
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
