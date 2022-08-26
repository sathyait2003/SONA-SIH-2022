import React, { useState } from 'react';
import styles from "./LoaderButton.module.css";
import ResourceContract from "../../../../ethereum/resource";
import web3 from "../../../../ethereum/web3";
import { useRouter } from "next/router"

function LoaderButton(props) {
    const router = useRouter();
    const [btnText, setbtnText] = useState(props.btnText);
    const [loading, setloading] = useState(false)

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        //Create Resource using hei instance
        const contactAddress = props.contractAddress;
        setloading(true);
        try {
            setbtnText("Waiting on Transaction success...");
            const Resource = ResourceContract(contactAddress);
            const accounts = await web3.eth.getAccounts();
            const amount = Number(props.amount) + 1;
            console.log(amount.toString());
            await Resource.methods.subscribeToInstitution().send({
                from: accounts[0],
                value: amount.toString(),
            });

            setbtnText("You've succssfully subscribed");
            setTimeout(() => {
                router.replace('/hei/' + contactAddress);
                setTimeout(() => {
                    setbtnText(`Subscribe @ ${props.amount} WEI per month`);
                }, 4000);
            }, 1000);
        }
        catch (err) {
            let message = '';
            console.log(err);
            if (err.code === 4001) {
                message = err.message.split(":")[1];
            } else {
                message = err.message;
            }
            setbtnText("Error Occured")
        }
        setloading(false);
    }
    return (
        <div className={`${styles.btn}`} style={{ width: `${props.width ? props.width : "162px"}` }}>
            <button onClick={onSubmitHandler}>{btnText}</button>
        </div>
    )
}

export default LoaderButton