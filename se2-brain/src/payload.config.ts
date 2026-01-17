import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload/config'
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
    db: mongooseAdapter({
        url: process.env.DATABASE_URI || '',
    }),
})
