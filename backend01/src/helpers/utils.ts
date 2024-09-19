import { hash } from 'bcrypt';
const saltRounds = 10;

export const hashPassword = async (plainPassword: string): Promise<string> => {
    try {
        return hash(plainPassword, saltRounds);
    } catch (error) {
        console.log(error);
    }
};
