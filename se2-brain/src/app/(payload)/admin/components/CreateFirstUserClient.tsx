'use client';

import {
    ConfirmPasswordField,
    EmailAndUsernameFields,
    Form,
    FormSubmit,
    PasswordField,
    RenderFields,
    useAuth,
    useConfig,
    useServerFunctions,
    useTranslation
} from '@payloadcms/ui';
import { abortAndIgnore, handleAbortRef } from '@payloadcms/ui/shared';

import React, { useEffect, useCallback, useRef } from 'react';

export const CreateFirstUserClient = ({
    docPermissions,
    docPreferences,
    initialState,
    loginWithUsername,
    userSlug
}: any) => {
    const configContext = useConfig();

    if (!configContext) {
        console.warn('CreateFirstUserClient: No Config Context found');
        return null;
    }

    const {
        config: {
            routes: {
                admin,
                api: apiRoute
            }
        },
        getEntityConfig
    } = configContext;

    const { getFormState } = useServerFunctions();
    const { t } = useTranslation();
    const { setUser } = useAuth();
    const abortOnChangeRef = useRef<AbortController | null>(null);

    const collectionConfig = getEntityConfig({
        collectionSlug: userSlug
    });

    const onChange = useCallback(async ({
        formState: prevFormState,
        submitted
    }: any) => {
        const controller = handleAbortRef(abortOnChangeRef as any);
        const response = await getFormState({
            collectionSlug: userSlug,
            docPermissions,
            docPreferences,
            formState: prevFormState,
            operation: 'create',
            schemaPath: userSlug,
            signal: controller.signal,
            skipValidation: !submitted
        });
        abortOnChangeRef.current = null;
        if (response && response.state) {
            return response.state;
        }
        return prevFormState;
    }, [userSlug, getFormState, docPermissions, docPreferences]);

    const handleFirstRegister = (data: any) => {
        setUser(data);
    };

    useEffect(() => {
        const abortOnChange = abortOnChangeRef.current;
        return () => {
            if (abortOnChange) {
                abortAndIgnore(abortOnChange);
            }
        };
    }, []);

    return (
        <div className="p-4 border border-red-500">
            <h1>Sanity Check: Create First User Client Loaded</h1>
            <p>If you see this, the crash is in the Form or its children.</p>
        </div>
    );
};
