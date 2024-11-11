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


export interface Attendances {
    id: number;
    user_id: string;
    name: string;
    in_time: Date;
    exit_time: Date|null;
}

export interface Capture {
    id: string;
    user_id: string;
    name: string;
    image: string;
    sex: number | null;
    snap_timestamp: string;
}

export interface FaceUser {
    id: number;
    UserID: string;
    userName: string;
    userImage: string;
    userGender: number;
    status: number;
}


export type AddUserResponse = {
    error: boolean;
    message: string;
    errors?: Array<string>;
};

export type AddUserFormData = {
    user_name: string;
    user_id: string;
    gender: string;
    image: File;
};

export type AddUserFormDataError = {
    user_name: string;
    user_id: string;
    gender: string;
    image: string;
};
