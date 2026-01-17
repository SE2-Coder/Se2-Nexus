import { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
    slug: 'categories',
    admin: {
        useAsTitle: 'name',
    },
    access: {
        read: () => true, // Update this with real access control later
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: 'color',
            type: 'text', // Hex code
        },
        {
            name: 'icon',
            type: 'text', // Icon name from library
        },
        {
            name: 'user',
            type: 'relationship',
            relationTo: 'users',
            required: true,
            hasMany: false,
        },
    ],
}
