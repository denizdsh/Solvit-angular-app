import { faCaretDown, faCaretRight, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faJava, faPython, faJsSquare } from '@fortawesome/free-brands-svg-icons';

export const icons = {
    caretDown: faCaretDown,
    caretRight: faCaretRight,
    eye: faEye,
    crossedEye: faEyeSlash,
    java: faJava,
    python: faPython,
    javascript: faJsSquare
}

export const patterns = {
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    password: /[a-zA-Z0-9\~\`\!\@\#\$\%\^\&\*\(\)\_\-\+\=\{\[\}\]\|\\\:\;\"\'\<\,\>\.\\\?]{6,}/
}