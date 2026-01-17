import { CollectionConfig } from 'payload'

export const OTPEntries: CollectionConfig = {
    slug: 'otp-entries',
    admin: {
        useAsTitle: 'issuer',
    },
    fields: [
        {
            name: 'issuer', // e.g. "Google", "Facebook"
            type: 'text',
            required: true,
        },
        {
            name: 'accountName', // e.g. "user@example.com"
            type: 'text',
        },
        {
            name: 'secret', // ENCRYPTED BLOB - Client Side Encryption
            type: 'textarea',
            required: true,
            admin: {
                description: 'Encrypted secret key. DO NOT EDIT MANUALLY.',
            },
        },
        {
            name: 'category',
            type: 'relationship',
            relationTo: 'categories',
        },
        {
            name: 'user',
            type: 'relationship',
            relationTo: 'users',
            required: true,
        },
    ],
}
