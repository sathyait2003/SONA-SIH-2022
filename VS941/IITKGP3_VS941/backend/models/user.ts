import { model, Schema } from "mongoose";

interface UserType {
    name: string;
    email: string;
    password: string;
    categoryAccess: string[];
    isAdmin: boolean;
}

const userSchema = new Schema<UserType>({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    categoryAccess: Array,
    isAdmin: {type: Boolean, required: true}
});

const User = model<UserType>('User', userSchema)

export default User