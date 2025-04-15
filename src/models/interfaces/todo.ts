import { PRIORITES } from "@/models/constant/priority";
import { STATUS } from "@/models/constant/status";
import { TYPES } from "@/models/constant/type";

export type Priority = typeof PRIORITES[number]

export type Status = typeof STATUS[number]

export type Type = typeof TYPES[number]

export type Developer = {
    id: number;
    avatar: string;
    name: string;
    role: string;
}

export type Order = 'asc' | 'desc'

export type Todo = {
    id: number;
    date: string | undefined;
    title: string;
    developer: Developer[];
    priority: Priority | undefined;
    status: Status | undefined;
    type: Type | undefined;
    "Estimated SP": number | undefined;
    "Actual SP": number | undefined;
}