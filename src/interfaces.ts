export interface IControl {
    onClick?: () => void;
    disabled?: boolean;
}

export interface ITile extends IControl {
    text?: string;
    isOpened?: boolean;
    isUnlock?: boolean;
}