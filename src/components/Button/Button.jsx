import styles from './Button.module.css'

const Button = ({ children, handleClick, style = 'primary', shadow = false, type = 'button' }) => {
    
    const buttonClasses = [
        styles.button,
        styles[style], 
        shadow && styles.shadow
    ].filter(Boolean).join(' ');

    return (
        <button
            type={type}
            onClick={handleClick}
            className={buttonClasses}
        >
            {children}
        </button>
    )
}
export default Button;
