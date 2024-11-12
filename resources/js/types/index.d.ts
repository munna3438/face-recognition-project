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
    snap_timestamp: Date;
}

export interface FaceUser {
    id: number;
    UserID: string;
    userImage: string;
    userName: string;
    userGender: number;
    status: number;
    log: string;
    institute: string;
}

export interface Institute {
    id: number;
    name: string;
    email: string;
    cam_ip: string;
    cam_port: string;
    token: string;
    max_user: string;
    status?: string;
}

export interface InstituteListResponse {
    data: Institute[];
    error: boolean;
    message: string;
}

export interface FaceUserListResponse {
    data: FaceUser[];
    error: boolean;
    message: string;
}

export interface CaptureListResponse {
    data: Capture[];
    error: boolean;
    message: string;
}

export interface AddInstituteFormDataError {
    name: string;
    email: string;
    cam_ip: string;
    cam_port: string;
    max_user: string;
}
export interface AddInstituteFormData {
    name: string;
    email: string;
    cam_ip: string;
    cam_port: string;
    max_user: string;
}

export type AddUserResponse = {
    error: boolean;
    message: string;
    errors?: Array<string>;
};
export type AddInstituteResponse = {
    error: boolean;
    message: string;
    errors?: Array<string>;
};

export type AddUserFormData = {
    user_name: string;
    user_id: string;
    gender: string;
    image: File;
    institute: string;
};

export type AddUserFormDataError = {
    user_name: string;
    user_id: string;
    gender: string;
    image: string;
    institute: string;
};


export interface UserAttendanceLogResponse {
    data: Attendances[];
    error: boolean;
    message: string;
}
