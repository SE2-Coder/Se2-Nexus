import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Categories } from './collections/Categories'
import { OTPEntries } from './collections/OTPEntries'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
    admin: {
        user: Users.slug,
    },
    collections: [Users, Categories, OTPEntries],
    editor: lexicalEditor({}),
    secret: process.env.PAYLOAD_SECRET || 'YOUR_SECRET_KEY',
    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },
    // Production settings
    serverURL: process.env.SERVER_URL || '',
    cors: '*', // Debug: allow all origins to fix 400 error
    csrf: [], // Debug: disable csrf to allow initial connection


    db: mongooseAdapter({
        url: process.env.DATABASE_URI || '',
    }),
    // Experimental: Trust proxy is handled via Next.js config usually, 
    // but Payload might need to know about it for rate limiting etc.
    // In Payload 3.0, trusting proxy is key for secure cookies over HTTP (internal) -> HTTPS (external)
    // We'll handle cookie settings if needed, but serverURL is step 1.
})
