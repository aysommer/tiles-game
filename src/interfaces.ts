export interface IControl {
    onClick?: () => void;
}

export interface ITile extends IControl {
    text?: string;
    isOpened?: boolean;
    isUnlock?: boolean;
}