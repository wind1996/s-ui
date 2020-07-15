export interface listItem {
    title: string;
    url?: string;
    blank?: string;
    children?: Array<listItem>;
    openNewTab?: boolean
}
