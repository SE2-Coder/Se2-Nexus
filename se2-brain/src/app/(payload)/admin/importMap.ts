import { CreateFirstUserClient } from './components/CreateFirstUserClient'


export const importMap = {
    // Critical for Create First User - Mapped to our Local Vendor File
    "@payloadcms/next/dist/views/CreateFirstUser/index.client.js#CreateFirstUserClient": CreateFirstUserClient,

    // Server View (might not be needed in map but good fallback)
    // "@payloadcms/next/views#CreateFirstUserView": CreateFirstUserView,

    // Template
    // "@payloadcms/next/templates#DefaultTemplate": DefaultTemplate,

    // The key that WAS found (mock it or provide real one)
    // "@payloadcms/ui/rsc#CollectionCards": CollectionCards
}
