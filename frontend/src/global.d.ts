export type User = {
    username: string;
    id: string;
    token: string;
} | null;
export type AlertFields = {
    isOpen: boolean;
    severity: "success" | "error";
    message: string;
};
