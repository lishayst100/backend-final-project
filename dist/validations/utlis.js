const urlRegex = /^https?:\/\/(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?:\/\/(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,}$/;
const phoneRegex = /^0\d([\d]{0,1})([- ]{0,1})\d{7}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{4})(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;
export { urlRegex, phoneRegex, passwordRegex };
