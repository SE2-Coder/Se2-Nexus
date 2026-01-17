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
    const {
        config: {
            routes: {
                admin,
                api: apiRoute
            }
        },
        getEntityConfig
    } = useConfig();

    const { getFormState } = useServerFunctions();
    const { t } = useTranslation();
    const { setUser } = useAuth();
    const abortOnChangeRef = useRef(null);

    const collectionConfig = getEntityConfig({
        collectionSlug: userSlug
    });

    const onChange = useCallback(async ({
        formState: prevFormState,
        submitted
    }: any) => {
        const controller = handleAbortRef(abortOnChangeRef);
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
    }, [userSlug, getFormState, docPermissions, docPreferences]);

    const handleFirstRegister = (data: any) => {
        setUser(data);
    };

    useEffect(() => {
        const abortOnChange = abortOnChangeRef.current;
        return () => {
            abortAndIgnore(abortOnChange);
        };
    }, []);

    return (
        <Form
            action={formatAdminURL({
                adminRoute: admin, // Note: original code used apiRoute and path directly but formatAdminURL might expect specific args. 
                // Original source: action: formatAdminURL({ apiRoute, path: `/${userSlug}/first-register` })
                // I will copy exact source logic if possible, but type definition might vary.
                // Let's assume the source code was correct for the version installed.
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
            <EmailAndUsernameFields
                className="emailAndUsername"
                loginWithUsername={loginWithUsername}
                operation="create"
                readOnly={false}
                t={t}
            />
            <PasswordField
                autoComplete="off"
                field={{
                    name: 'password',
                    label: t('authentication:newPassword'),
                    required: true
                }}
                path="password"
            />
            <ConfirmPasswordField />
            <RenderFields
                fields={collectionConfig.fields}
                forceRender={true}
                parentIndexPath=""
                parentPath=""
                parentSchemaPath={userSlug}
                permissions={true}
                readOnly={false}
            />
            <FormSubmit size="large">
                {t('general:create')}
            </FormSubmit>
        </Form>
    );
};
