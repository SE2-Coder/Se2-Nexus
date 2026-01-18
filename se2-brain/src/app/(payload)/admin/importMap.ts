import { CreateFirstUserView } from '@payloadcms/next/views'
import { DefaultTemplate } from '@payloadcms/next/templates'

// Vendor component to bypass export restrictions
import { CreateFirstUserClient } from './components/CreateFirstUserClient'
import { DummyClient } from './components/Dummy'
// @ts-ignore
import { CollectionCards } from '@payloadcms/ui/rsc'

export const importMap = {
    // Critical for Create First User - Mapped to our Local Vendor File
    "@payloadcms/next/dist/views/CreateFirstUser/index.client.js#CreateFirstUserClient": DummyClient,

    // Server View (might not be needed in map but good fallback)
    "@payloadcms/next/views#CreateFirstUserView": CreateFirstUserView,

    // Template
    "@payloadcms/next/templates#DefaultTemplate": DefaultTemplate,

    // The key that WAS found (mock it or provide real one)
    "@payloadcms/ui/rsc#CollectionCards": CollectionCards
}
