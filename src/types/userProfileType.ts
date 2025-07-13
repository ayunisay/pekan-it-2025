export interface UserProfileType {
    id: number;
    userId: number;
    address: string
    city: string;
    province: string;
    country: string;
    postalCode: string;
    isLocationShared: boolean;
    position: any; //temp
    createdAt: string;    
    updatedAt: string;
};

export interface PostUserProfileType {
    userId: number;
    address?: string
    city?: string;
    province?: string;
    country?: string;
    postalCode?: string;
    isLocationShared?: boolean;
    latitude?: number;
    longitude?: number
}