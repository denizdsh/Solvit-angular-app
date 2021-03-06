import { faCaretDown, faCaretRight, faEye, faEyeSlash, faHeart, faComment, faBookmark, faPencilAlt, faTrash, faClock, faSortAmountUp, faSortAmountDownAlt } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as emptyBookmark, faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';
import { faJava, faPython, faJsSquare } from '@fortawesome/free-brands-svg-icons';

export type category = 'javascript' | 'java' | 'csharp' | 'python' | 'c++' | 'php' | 'devops' | 'qa' | 'front-end' | 'react' | 'jquery' | 'angular' | 'vue.js' | 'back-end' | 'node.js' | 'spring' | 'asp.net' | 'django' | 'other';
export type query = { sortBy: 'date' | 'popularity', order: 'asc' | 'desc' };
export type topicType = 'all' | 'followed' | 'category' | 'user' | 'saved';

export const mainCategories: category[] = ['javascript', 'java', 'csharp', 'python', 'c++', 'php', 'devops', 'qa', 'front-end', 'back-end', 'other'];
export const subCategories: { 'front-end': category[], 'back-end': category[] } = {
    'front-end': ['react', 'jquery', 'angular', 'vue.js'],
    'back-end': ['node.js', 'spring', 'asp.net', 'django']
}
export const categories = mainCategories
    .slice(0, mainCategories.indexOf('front-end') + 1)
    .concat(subCategories['front-end'])
    .concat(mainCategories
        .slice(mainCategories.indexOf('front-end') + 1, mainCategories.indexOf('back-end') + 1))
    .concat(subCategories['back-end'])
    .concat(mainCategories.slice(mainCategories.indexOf('back-end') + 1));

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
    delete: faTrash,
    clock: faClock,
    sortAsc: faSortAmountUp,
    sortDesc: faSortAmountDownAlt
}

export const patterns = {
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    password: /[a-zA-Z0-9\~\`\!\@\#\$\%\^\&\*\(\)\_\-\+\=\{\[\}\]\|\\\:\;\"\'\<\,\>\.\\\?]{6,}/,
    url: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.,~#?&\/=]*)/
}

export function formatCategory(category: category | string): string {
    switch (category) {
        case 'javascript':
            return 'JavaScript';
        case 'csharp':
            return 'C#';
        case 'php':
            return 'PHP';
        case 'devops':
            return 'DevOps';
        case 'qa':
            return 'Quality Assurance';
        case 'jquery':
            return 'jQuery';
        case 'asp.net':
            return 'ASP.NET';
    }

    return category[0].toLocaleUpperCase().concat(category.slice(1));
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
            const currentMinutes = currentDate.getUTCMinutes();
            const minutesDifference = (currentHour * 60 + currentMinutes) - (hour * 60 + minutes);
            if (minutesDifference >= 60)
                return `${Math.floor(minutesDifference / 60)} hours ago`;
            else {
                if (minutesDifference > 0) {
                    return `${minutesDifference} minutes ago`;
                } else {
                    return 'a few moments ago';
                }
            }
        } else {
            return `${day} ${months[Number(month) - 1]} ${year != currentYear ? year : ''} at ${hour}:${minutes}`;
        }
    })();
}