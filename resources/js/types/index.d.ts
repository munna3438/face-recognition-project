export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};


export interface Capture {
    id: string;
    user_id: string;
    name: string;
    image: string;
    sex: number|null;
    snap_timestamp: string;
}
