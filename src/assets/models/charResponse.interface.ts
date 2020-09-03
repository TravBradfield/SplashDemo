export interface CharResponse {
    id: string;
    name: string;
    species: string;
    status: string;
    image: string;
    type: string;
    gender: string;
    origin: {
        name: string;
        url: string;
    };
    location: {
        name: string;
        url: string;
    };
    episode: string[];
    url: string;
    created: Date;
}