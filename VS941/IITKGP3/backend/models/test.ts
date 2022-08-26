import { model, Schema } from "mongoose";

interface TestType {
    name: string;
}

const testSchema = new Schema<TestType>({
    name: {type: String, required: true}
});

const Test = model<TestType>('Test', testSchema)

export default Test