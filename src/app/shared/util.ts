import { faCaretDown, faCaretRight, faEye, faEyeSlash, faHeart, faComment, faBookmark, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as emptyBookmark, faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';
import { faJava, faPython, faJsSquare } from '@fortawesome/free-brands-svg-icons';

export type category = 'javascript' | 'java' | 'csharp' | 'python' | 'c++' | 'php' | 'devops' | 'qa' | 'front-end' | 'react' | 'jquery' | 'angular' | 'vue.js' | 'back-end';
export type query = { sortby: 'date' | 'popularity', order: 'asc' | 'desc' };

export const icons = {
    caretDown: faCaretDown,
    caretRight: faCaretRight,
    eye: faEye,
    crossedEye: faEyeSlash,
    java: faJava,
    python: faPython,
    javascript: faJsSquare,
    like: faHeart,
    dislike: emptyHeart,
    comment: faComment,
    save: faBookmark,
    unsave: emptyBookmark,
    edit: faPencilAlt,
    delete: faTrash
}

export const patterns = {
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    password: /[a-zA-Z0-9\~\`\!\@\#\$\%\^\&\*\(\)\_\-\+\=\{\[\}\]\|\\\:\;\"\'\<\,\>\.\\\?]{6,}/
}

export function formatDate(rawDate: string): string {
    const months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    let [date, time] = rawDate.split('T');
    let [hour, minutes] = time.split(':').map(Number);
    time = `${hour}:${minutes}`;

    const currentDate = new Date();
    const currentYear = currentDate.getUTCFullYear();
    const currentMonth = currentDate.getUTCMonth();
    const currentDay = currentDate.getUTCDate();

    let [year, month, day] = date.split('-').map(Number);

    return (() => {
        if (currentYear == year && currentMonth + 1 == month && currentDay == day) {
            const currentHour = currentDate.getUTCHours();
            if (currentHour - hour > 0) {
                return `${currentHour - hour} hours ago`;
            } else {
                const currentMinutes = currentDate.getUTCMinutes();
                if (currentMinutes - minutes > 0) {
                    return `${currentMinutes - minutes} minutes ago`;
                } else {
                    return 'a few moments ago';
                }
            }
        } else {
            return `${day} ${months[Number(month) - 1]} ${year != currentYear ? year : ''} at ${hour}:${minutes}`;
        }
    })();
}