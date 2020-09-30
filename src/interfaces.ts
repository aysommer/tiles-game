export interface IControl {
    onClick?: () => void;
    isDisabled?: boolean;
}

export interface ITile extends IControl {
    text?: string;
    isOpened?: boolean;
    isUnlock?: boolean;
}