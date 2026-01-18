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
import { formatAdminURL } from 'payload/shared';
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
        <Form
            action={formatAdminURL({
                apiRoute,
                path: `/${userSlug}/first-register`
            })}
            initialState={{
                ...initialState,
                'confirm-password': {
                    ...initialState['confirm-password'],
                    valid: initialState['confirm-password']['valid'] || false,
                    value: initialState['confirm-password']['value'] || ''
                }
            }}
            method="POST"
            onChange={[onChange]}
            onSuccess={handleFirstRegister}
            redirect={admin}
            validationOperation="create"
        >
            {/* <EmailAndUsernameFields
                className="emailAndUsername"
                loginWithUsername={loginWithUsername}
                operation="create"
                readOnly={false}
                t={t as any}
            /> */}
            {/* <PasswordField
                autoComplete="off"
                field={{
                    name: 'password',
                    label: t('authentication:newPassword'),
                    required: true
                }}
                path="password"
            /> */}
            {/* <ConfirmPasswordField /> */}
            {/* <RenderFields
                fields={collectionConfig.fields}
                forceRender={true}
                parentIndexPath=""
                parentPath=""
                parentSchemaPath={userSlug}
                permissions={true}
                readOnly={false}
            /> */}
            <div className="debug-placeholder">DEBUG: Form Content Removed</div>
            <FormSubmit size="large">
                {t('general:create')}
            </FormSubmit>
        </Form>
    );
};
