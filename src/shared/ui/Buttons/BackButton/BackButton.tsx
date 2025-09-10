import './BackButton.css';
import { leftArrow } from '../../../assets/index';

interface IBackButton {
    children: string;
    onClick: () => void;
    disabled: false;
}

export const BackButton: React.FC<IBackButton> = ({ children, onClick, disabled }) => (
    <button className="button-back fourtwo"
            onClick={onClick}
            disabled={disabled}
    >
    <img src={leftArrow} alt={'leftArrowtype'} className="leftArrow" />
    {children}
    </button>
);