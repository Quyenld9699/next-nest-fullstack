import { compare, compareSync, hash } from 'bcrypt';
const saltRounds = 10;

export const hashPassword = async (plainPassword: string): Promise<string> => {
    try {
        return hash(plainPassword, saltRounds);
    } catch (error) {
        console.log(error);
    }
};

export const comparePassword = async (plainPassword: string, hashPassword: string): Promise<boolean> => {
    try {
        return await compare(plainPassword, hashPassword);
    } catch (error) {
        console.log(error);
    }
};
