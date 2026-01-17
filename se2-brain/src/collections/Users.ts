import { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
    slug: 'users',
    auth: true,
    admin: {
        useAsTitle: 'email',
    },
    fields: [
        // Email is added by default
        // Add more fields as needed
    ],
}
