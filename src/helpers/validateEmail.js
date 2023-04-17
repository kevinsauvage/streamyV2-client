const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const validateEmail = (email) => emailRegex.test(email);

export default validateEmail;
