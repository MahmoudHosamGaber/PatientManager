import English from "../Data/English.json";
import Arabic from "../Data/Arabic.json";
const language: string = "ar";
export const translate = (key: string) => {
    if (language === "en") return translateToEnglish(key);
    if (language === "ar") return translateToArabic(key);
    return "Awaiting translation";
};
const translateToEnglish = (key: string): any => {
    return (English as any)[key] || "Awaiting translation";
};

const translateToArabic = (key: string): any => {
    return (Arabic as any)[key] || "Awaiting translation";
};
